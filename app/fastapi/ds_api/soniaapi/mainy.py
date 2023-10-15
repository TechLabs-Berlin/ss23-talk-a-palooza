import pandas as pd
import numpy as np
import scipy
from sklearn.neighbors import NearestNeighbors
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, NonNegativeInt
import json
import uvicorn
import fastparquet
import joblib


#api for backup knn model, not elegant but works :) also fast
#no error handling, some files/packages a bit redundant? 

app = FastAPI()

origins = ["*"] # development only

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

wordsz = pd.read_parquet("words.parquet")
word_mapping = dict(zip(wordsz["wordBankId"], wordsz.index))
user_interactions = [0] * 680
knn = joblib.load("mod.pkl")
itemsim = pd.read_parquet("itemsim.parquet")
itemsim = itemsim.values.reshape(680,680)
user_item_matrix = pd.read_parquet("user_item_matrix.parquet")
df2 = pd.read_csv("checkdat.csv")
user_weight = 0.5
item_weight = 1 - user_weight
formatted_final_scores = []

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
    distance, neighbor_indices = knn.kneighbors([user_interactions])

    user_based_recommendations = []
    for neighbor_index in neighbor_indices[0]:
        neighbor_interactions = user_item_matrix.iloc[neighbor_index]
        
        user_based_recommendations.extend([int(item.split('_')[1]) for item in neighbor_interactions[neighbor_interactions == 1].index])

    user_based_recommendations = [item for item in user_based_recommendations if user_interactions[item] == 0]
    user_based_recommendations = list(set(user_based_recommendations))

    item_scores = {
        item_id: sum(
            itemsim[item_id, user_interaction]
            for user_interaction, interaction_value in enumerate(user_interactions)
            if interaction_value == 1
        ) / sum(user_interactions)
        for item_id in user_based_recommendations
    }

    final_scores = {
        item_id: combined_score
        for item_id, neighbor_interaction in zip(item_scores.keys(), neighbor_interactions)
        for combined_score in [(distance * user_weight + item_scores[item_id] * item_weight)/2]
        if item_id not in combined_score or combined_score < final_scores[item_id]
    }

    final_scores = {key: np.min(value) for key, value in final_scores.items()}
    final_scores = {key+1: value for key, value in final_scores.items()}

    

    for item_id, score in final_scores.items():
        if item_id in wordsz.index:
            item_definition = wordsz.loc[item_id, "word"]
            wbi = wordsz.loc[item_id, "wordBankId"]

            formatted_item = {
                "name": item_definition,
                "priority": score,
                "wordBankId": wbi
            }

            formatted_final_scores.append(formatted_item)

    return formatted_final_scores
