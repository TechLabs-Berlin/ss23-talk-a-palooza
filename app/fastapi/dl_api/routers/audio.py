from pydantic import BaseModel
from fastapi import APIRouter
from typing import Dict, Tuple
from fastai.vision.all import *
from fastcore.utils import gt
import librosa
import numpy as np
import matplotlib.pyplot as plt
import base64
import pathlib

router = APIRouter()

path = Path("./models")
learn_inf = load_learner(path/'export.pkl')

def convert_to_spectrogram(af):   
    x, sr = librosa.load(af, sr=44100)
    X = librosa.stft(x)
    Xdb = librosa.amplitude_to_db(abs(X))

    plt.figure(frameon=False)
    plt.axis('off')
    librosa.display.specshow(Xdb, sr=sr, x_axis='time', y_axis='log', cmap='magma')

    dst = './output/temp_spectro.png'

    plt.savefig(dst, dpi='figure', bbox_inches='tight',transparent=True, pad_inches=0)
    plt.close()
    
def create_intelligibility_score_lax(prediction, target_word):
  is_recognised = False
  score = 0.0

  ind = np.argpartition(prediction[2], -5)[-5:]
  if prediction[1] in ind:
    new_ind = np.delete(ind, [i for i in range(len(ind)) if ind[i] == prediction[1]])
    if prediction[0] == target_word:
      is_recognised = True
      score = prediction[2][prediction[1]] - prediction[2][new_ind][np.argmax(prediction[2][new_ind])]
      if score < 0.5: # for cases where the score would dip below .5, should be handled more elegantly
        score = prediction[2][prediction[1]]
    else:
      diff = (prediction[2][prediction[1]] - prediction[2][new_ind][np.argmax(prediction[2][new_ind])])
      if diff < 0.2 and prediction[2][prediction[1]] > 0.4:
        is_recognised = True
        score = prediction[2][new_ind][np.argmax(prediction[2][new_ind])]
      else:
        print(prediction[0])
        print(prediction[1])
        print(prediction[2][prediction[1]])
        print(prediction[2][new_ind][np.argmax(prediction[2][new_ind])])
        score = prediction[2][new_ind][np.argmax(prediction[2][new_ind])]
      if score < 0:
        score = 0
  return is_recognised, score

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

    if not audio_raw:
      response = SingleResponse(is_recognized = False, intelligibilityScore = -1)
      return response

    try:
      decode = base64.b64decode(audio_raw)
    except OSError:
      response = SingleResponse(is_recognized = False, intelligibilityScore = -1)
      return response
    
    try:
      print("Error while writing audio file")
      with io.BytesIO() as buffer:
          buffer.write(decode)
          buffer.seek(0)
          with open("./output/audio.ogg", 'wb') as file:
              file.write(buffer.getvalue())
    except OSError:
      response = SingleResponse(is_recognized = False, intelligibilityScore = -1)
      return response

    try:
      convert_to_spectrogram('./output/audio.ogg')
      pathlib.Path.unlink(pathlib.Path('./output/audio.ogg')) 
    except RuntimeError:
      print("Error while transforming audio file")

    try:
      target_predicts = learn_inf.predict('./output/temp_spectro.png')
      pathlib.Path.unlink(pathlib.Path('./output/temp_spectro.png')) 
    except RuntimeError:
      print("Error while predicting output vector")

    if target_predicts:
      (match, score) = create_intelligibility_score_lax(target_predicts, target_term)
    else:
       match = False
       score = -1
       
    print(target_term, match, score)

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