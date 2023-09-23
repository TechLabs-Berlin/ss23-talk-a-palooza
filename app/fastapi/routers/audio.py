from pydantic import BaseModel
from fastapi import APIRouter

import random # for placeholder only

router = APIRouter()

# models. these should be in their own /models directory:

class Query(BaseModel): 
    audio: str
    target_term: str

class Response(BaseModel):
    target_match: bool
    score: float

@router.post("/audio")
async def rate_audio(q: Query): # declaring it as a required parameter
    audio_raw = q.audio
    target_term = q.target_term
    print("Audio received")
    # send to model
    # placeholder to return values:
    score = random.random()
    match = score > 0.5
    response = Response(target_match = match, score = score)
    return response

@router.get("/") # test
async def home(): 
    return "Success"