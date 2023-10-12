import pandas as pd
import numpy as np
import scipy
from sklearn.neighbors import NearestNeighbors
from fastapi import FastAPI
from pydantic import BaseModel, NonNegativeInt
import json
import uvicorn
import fastparquet
import joblib


#api for backup knn model, not elegant but works :) also fast
#no error handling, some files a bit redundant

app = FastAPI()

wordsz = pd.read_parquet("words.parquet")
word_mapping = dict(zip(wordsz["wordBankId"], wordsz.index))
user_interactions = [0] * 680
knn = joblib.load("mod.pkl")
itemsim = pd.read_parquet("itemsim.parquet")
itemsim = itemsim.values.reshape(680,680)
user_item_matrix = pd.read_parquet("user_item_matrix.parquet")
df2 = pd.read_csv("checkdat.csv")

@app.post("/predict/")
def process(assessment: dict):
    spoken_words = assessment.get("spokenWords", [])
    spoken_ids = [word["wordBankId"] for word in spoken_words]
    
    spi = [word_mapping.get(wbi) for wbi in spoken_ids]
    
    for item in spi:
        user_interactions[item] = 1

    recommendations = recommendations_model(user_interactions)
    
    return recommendations

def recommendations_model(user_interactions):
    
    with open('output1.json', 'r') as file:
        ilegend = json.load(file)

    words = [item["name"] for item in ilegend if item["is_audio"]]
    ids = []

    for word in words:
        match = df2[df2["item_definition"] == word]
        ids.extend(match["item_id"].tolist())

    ids = [int(item.split('_')[1]) for item in ids]

    distance, neighbor_indices = knn.kneighbors([user_interactions])

    user_based_recommendations = []
    for neighbor_index in neighbor_indices[0]:
        neighbor_interactions = user_item_matrix.iloc[neighbor_index]

        user_based_recommendations.extend([int(item.split('_')[1]) for item in neighbor_interactions[neighbor_interactions == 1].index])

    user_based_recommendations = [item for item in user_based_recommendations if 0 <= item <= len(user_interactions) and user_interactions[item] == 0]
    user_based_recommendations = list(set(user_based_recommendations))

    item_scores = {}
    for item_id in range(len(itemsim)):
        similar_items = np.argsort(itemsim[item_id])[::-1]
        similar_items = [item for item in similar_items if user_interactions[item] == 0]
        similarity_score = sum(itemsim[item_id][similar_items])
        item_scores[item_id] = similarity_score

    sorted_items = sorted(item_scores.items(), key=lambda x: x[1], reverse=True)
    item_based_recommendations = [item_id for item_id, _ in sorted_items]
    item_based_recommendations = list(set(item_based_recommendations))

    user_weight = 0.3
    item_weight = 1 - user_weight

    combined_recommendations = []
    for item_id in user_based_recommendations:
        user_score = 1
        item_score = item_scores.get(item_id, 0)
        combined_score = (user_weight * user_score) + (item_weight * item_score)

        combined_recommendations.append((item_id, combined_score))

    combined_recommendations.sort(key=lambda x: x[1], reverse=True)
    combined_recommendations = [(item_id + 1, combined_score) for item_id, combined_score in combined_recommendations]

    final_items = [item_id for item_id, _ in combined_recommendations]
#have code that filters output if necessary, making sure that only 6 words get
# recommended and only those that are is_audio: True,
# but rose i think you do that already?

#words are only filtered out if they have already been learned by kid according to
#user_interaction
    final_words = []
    for item in final_items:
        item = "item_" + str(item)
        definition = df2[df2["item_id"] == item]["item_definition"]
        final_words.append(definition)

    matching_values = [(tup[1], list(word_mapping.keys())[list(word_mapping.values()).index(tup[0])]) for tup in combined_recommendations if tup[0] in word_mapping.values()]
    result = [(tup, wordsz.loc[wordsz["wordBankId"] == tup[1], "word"].values[0]) for tup in matching_values if tup[1] in wordsz["wordBankId"].values]
    formatted_result = [
    {
        "name": tup[1],
        "priority": tup[0][0],
        "wordBankId": tup[0][1]
    }
    for idx, tup in enumerate(result)
    ]

    # Return the list of recommendations sorted by score with their priorities
    return formatted_result