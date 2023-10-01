from contextlib import asynccontextmanager
from dataclasses import dataclass
from importlib.resources import as_file, files
from pathlib import Path
from typing import Annotated, Union

import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Query
from libreco.algorithms import LightGCN
from libreco.data import DataInfo, DatasetPure


@dataclass(frozen=True)
class ModelData:
    old_data_info: DataInfo
    word_to_ids: dict[str, int]
    ids_to_words: dict[int, str]
    weights_directory: Path


model_data: ModelData = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    from ss23_talk_a_palooza import model_files

    global model_data

    data_files = files(model_files).joinpath("")

    with as_file(data_files.joinpath("words.parquet")) as f:
        df_words = pd.read_parquet(f)

    series = df_words["item_definition"]
    ids_to_words = series.to_dict()
    words_to_ids = pd.Series(series.index.values, index=series).to_dict()

    with as_file(data_files.joinpath("data-info")) as data_info_directory:
        old_data_info = DataInfo.load(data_info_directory, model_name="lightgcn")

    with as_file(data_files.joinpath("weights")) as weights_directory:
        assert weights_directory.exists()
        assert weights_directory.is_dir()
        assert len(list(weights_directory.iterdir())) > 0

    model_data = ModelData(
        old_data_info=old_data_info,
        word_to_ids=words_to_ids,
        ids_to_words=ids_to_words,
        weights_directory=weights_directory,
    )
    yield


app = FastAPI(lifespan=lifespan)


@app.get("/predict")
def predict(q: Annotated[Union[set[str], None], Query(min_length=1)] = None) -> list[str]:
    words = q
    if not words:
        raise HTTPException(401, "No words were specified. Use the `q` parameter in the URL query.")
    child_id = -1
    # Train the model with the words spoken by the new child
    if not words.issubset(model_data.word_to_ids.keys()):
        invalid_words = words.difference(model_data.word_to_ids.keys())
        invalid_words_error = ", ".join(invalid_words)
        raise HTTPException(401, f"These words are not allowed: {invalid_words_error}")

    words_ids = [model_data.word_to_ids[word] for word in words]
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
    predicted_words = [w for w in predicted_words if w not in words]
    predicted_words = predicted_words[:6]
    return predicted_words


@app.get("/allowed_words")
def allowed_words() -> list[str]:
    return sorted(model_data.word_to_ids.keys())


def main():
    import argparse

    import uvicorn

    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default="8000")
    parser.add_argument("--host", default="0.0.0.0")
    args = parser.parse_args()
    uvicorn.run(app, host=args.host, port=int(args.port))


if __name__ == "__main__":
    main()
