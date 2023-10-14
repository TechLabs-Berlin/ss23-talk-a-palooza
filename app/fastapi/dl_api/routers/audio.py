from pydantic import BaseModel
from fastapi import APIRouter
from typing import Dict, Tuple
from fastai.vision.all import *
from fastcore.utils import gt
import base64

router = APIRouter()

path = Path("./models")
learn_inf = load_learner(path/'export.pkl')

class SingleQuery(BaseModel): 
    binaryAudioData: str # replace with binary audio data
    name: str

class SingleResponse(BaseModel):
    is_recognized: bool
    intelligibilityScore: float
    # binaryAudioData: str # replace with binary audio data

class MultiQuery(BaseModel): 
    data: Dict[str, str] # format: {"word": "data", "word2": "data2"}
    
class MultiResponse(BaseModel):
    response_data: Dict[str, Tuple[bool, float]] # format: {"word": (boolean, float), "word2": (boolean, float)}

@router.post("/speech-analysis")
async def rate_audio(q: SingleQuery): # declaring it as a required parameter
    audio_raw = q.binaryAudioData
    target_term = q.name
    print("Audio received")

    audio = base64.decode(audio_raw)
    with open("audio", 'w') as file:
        file.write(audio)
    
    learn_inf.predict()
    response = SingleResponse(is_recognized = match, intelligibilityScore = score)
    return response

@router.post("/audio/multi")
async def rate_audio(q: MultiQuery): # declaring it as a required parameter
    data = q.data
    target_term, audio_data = data["name"], data["binaryAudioData"]
    print("Audio received")
    response = MultiResponse(response_data = {target_term: [match, score]})
    return response

@router.get("/") # test
async def home(): 
    return "Success"