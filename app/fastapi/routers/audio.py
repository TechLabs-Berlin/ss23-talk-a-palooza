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
    binaryAudioData: str # replace with binary audio data
    name: str

class SingleResponse(BaseModel):
    is_recognized: bool
    intelligibilityScore: float
    # binaryAudioData: str # replace with binary audio data

# for bundled query-response approach (called after completing full set of exercises):

# {
#   "data": {"target_term": "Banana", "audio": "Test data"}
# }

class MultiQuery(BaseModel): 
    data: Dict[str, str] # format: {"word": "data", "word2": "data2"}
    
class MultiResponse(BaseModel):
    response_data: Dict[str, Tuple[bool, float]] # format: {"word": (boolean, float), "word2": (boolean, float)}

@router.post("/speech-analysis")
async def rate_audio(q: SingleQuery): # declaring it as a required parameter
    audio_raw = q.binaryAudioData
    target_term = q.name
    print("Audio received")
    # send to model
    # placeholder to return values:
    score = random.random()
    match = score > 0.5
    response = SingleResponse(is_recognized = match, intelligibilityScore = score)
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