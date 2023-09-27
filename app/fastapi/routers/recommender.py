from pydantic import BaseModel
from fastapi import APIRouter
from typing import Dict, Tuple

router = APIRouter()

# Define a Pydantic model for the incoming data
class RecommendData(BaseModel):
    spokenWords: list
    child: dict

# Define a route to receive data from the Express backend
@router.post("/recommendations")
async def get_recommendations(data: RecommendData):
    try:
       # Access the received data using the variable 'data'
        
        # Extract spokenWords and child information
        spoken_words = data.spokenWords
        child_info = data.child

        # Now you can use 'spoken_words' and 'child_info' in your logic
        # Replace this with your recommendation logic
        recommended_words = [
            {"name": "Banana", "wordBankId": "650d2691df78bbefe5a91340", "priority": 1, "wordLevel": 1},
            {"name": "Dog", "wordBankId": "650ab431c748f750285942e2", "priority": 2, "wordLevel": 1},
        ]

        return {"recommendedWords": recommended_words}
    except Exception as e:
        # Handle any errors or exceptions that may occur during processing
        print("Error:", str(e))
        return {"error": str(e)}
