from contextlib import asynccontextmanager
from dataclasses import dataclass
from importlib.resources import as_file, files
from operator import itemgetter
from pathlib import Path
from typing import Annotated, Any, TypedDict

import numpy as np
import pandas as pd
from fastapi import Body, FastAPI, HTTPException
from libreco.algorithms import LightGCN
from libreco.data import DataInfo, DatasetPure
from pydantic import BaseModel, NonNegativeInt


@dataclass(frozen=True)
class ModelData:
    old_data_info: DataInfo
    wordBankId_to_ids: dict[str, int]
    ids_to_words: dict[int, dict[str, str]]
    weights_directory: Path


model_data: ModelData = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    from ss23_talk_a_palooza import model_files

    global model_data

    data_files = files(model_files).joinpath("")

    with as_file(data_files.joinpath("words.parquet")) as f:
        df_words = pd.read_parquet(f)


    ids_to_words = df_words.to_dict("index")
    # Swap the column `wordBankId` with the index
    wordBankId_to_ids = {wordBankId: index
                         for index, wordBankId in df_words["wordBankId"].items()}

    with as_file(data_files.joinpath("data-info")) as data_info_directory:
        old_data_info = DataInfo.load(data_info_directory, model_name="lightgcn")

    with as_file(data_files.joinpath("weights")) as weights_directory:
        assert weights_directory.exists()
        assert weights_directory.is_dir()
        assert len(list(weights_directory.iterdir())) > 0

    model_data = ModelData(
        old_data_info=old_data_info,
        wordBankId_to_ids=wordBankId_to_ids,
        ids_to_words=ids_to_words,
        weights_directory=weights_directory,
    )
    yield


app = FastAPI(lifespan=lifespan)


class Word(BaseModel):
    name: str
    wordBankId: str


class Input(BaseModel):
    spokenWords: list[Word]
    child: dict[str, Any]


class OutputWord(BaseModel):
    wordBankId: str
    name: str
    priority: NonNegativeInt


@app.post("/predict/")
def predict(predict_input: Annotated[Input, Body()]) -> list[OutputWord]:
    # if not words:
    #     raise HTTPException(401, "No words were specified.")
    child_id = -1
    requested_wordBankIds = {w.wordBankId for w in predict_input.spokenWords}
    # Train the model with the words spoken by the new child
    if not requested_wordBankIds.issubset(model_data.wordBankId_to_ids.keys()):
        invalid_words = [
            w.name
            for w in predict_input.spokenWords
            if w.wordBankId not in model_data.wordBankId_to_ids.keys()
        ]
        invalid_words_error = ", ".join(invalid_words)
        raise HTTPException(401, f"These words are not allowed: {invalid_words_error}")

    words_ids = [model_data.wordBankId_to_ids[wordBankId] for wordBankId in requested_wordBankIds]
    df_train = pd.DataFrame({"user": child_id, "item": words_ids, "label": 1.0})

    old_data_info = model_data.old_data_info
    data, data_info = DatasetPure.merge_trainset(df_train, old_data_info)
    model = LightGCN(
        task="ranking",
        data_info=data_info,
        loss_type="bpr",
        embed_size=16,
        n_epochs=1,
        lr=1e-3,
        batch_size=2048,
        num_neg=1,
        device="cuda",
    )
    model.rebuild_model(model_data.weights_directory, model_name="lightgcn")

    model.fit(
        data,
        neg_sampling=True,  # sample negative items for train and eval data
        verbose=2,
    )

    # Predict the words for this child
    recommendation: dict[int, np.ndarray] = model.recommend_user(user=child_id, n_rec=20)
    predicted_word_ids = recommendation[child_id]

    predicted_words = [model_data.ids_to_words[word_id] for word_id in predicted_word_ids]
    # Drop words already learned by the child
    predicted_words = filter(lambda w: w["wordBankId"] not in requested_wordBankIds, predicted_words)
    # Only a maximum of 6 words is needed
    predicted_words = list(predicted_words)[:6]
    return [OutputWord(name=w["word"], priority=priority, wordBankId=w["wordBankId"])
            for priority, w in enumerate(predicted_words)]


@app.get("/allowed_words")
def allowed_words() -> list[dict[str, str]]:
    ret = [model_data.ids_to_words[item_id]
           for item_id in model_data.wordBankId_to_ids.values()]
    ret = [{"name": obj["word"], "wordBankId": obj["wordBankId"]}
           for obj in ret]
    return sorted(ret, key=itemgetter("name"))


def main():
    import argparse

    import uvicorn

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default="8001")
    parser.add_argument("--host", default="0.0.0.0")
    args = parser.parse_args()
    uvicorn.run(app, host=args.host, port=int(args.port))


if __name__ == "__main__":
    main()
