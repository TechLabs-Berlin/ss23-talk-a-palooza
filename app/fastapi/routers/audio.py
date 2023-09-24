from pydantic import BaseModel
from fastapi import APIRouter
from typing import Dict, Tuple

import random # for placeholder only

router = APIRouter()

# models. these should be in their own /models directory:
# for single query-response approach (called after each single exercise):

# {
#   "audio": "Test",
#   "target_term": "Test"
# }

class SingleQuery(BaseModel): 
    audio: str
    target_term: str

class SingleResponse(BaseModel):
    target_match: bool
    score: float

# for bundled query-response approach (called after completing full set of exercises):

# {
#   "data": {"target_term": "Banana", "audio": "Test data"}
# }

class MultiQuery(BaseModel): 
    data: Dict[str, str] # format: {"word": "data", "word2": "data2"}
    
class MultiResponse(BaseModel):
    response_data: Dict[str, Tuple[bool, float]] # format: {"word": (boolean, float), "word2": (boolean, float)}

@router.post("/audio/single")
async def rate_audio(q: SingleQuery): # declaring it as a required parameter
    audio_raw = q.audio
    target_term = q.target_term
    print("Audio received")
    # send to model
    # placeholder to return values:
    score = random.random()
    match = score > 0.5
    response = SingleResponse(target_match = match, score = score)
    return response

@router.post("/audio/multi")
async def rate_audio(q: MultiQuery): # declaring it as a required parameter
    data = q.data
    target_term, audio_data = data["target_term"], data["audio"]
    print("Audio received")
    # send to model
    # placeholder to return values:
    score = random.random()
    match = score > 0.5
    response = MultiResponse(response_data = {target_term: [match, score]})
    return response

@router.get("/") # test
async def home(): 
    return "Success"