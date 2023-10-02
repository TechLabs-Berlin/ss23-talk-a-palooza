from pydantic import BaseModel
from fastapi import APIRouter

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
            {"wordBankId": "650d2691df78bbefe5a91340", "name": "Banana", "priority": 1, "image": "banana.svg", "category": "food", "is_audio": True, "wordLevel": 1},
            {"wordBankId": "650ab3b1c748f7502858d848", "name": "Teddy", "category": "toys", "priority": 2, "image": "teddy.svg", "is_audio": True, "wordLevel": 1},
            {"wordBankId": "650ab3edc748f75028590a6f", "name": "Baby", "category": "people", "priority": 3, "image": "baby.svg", "is_audio": True,"wordLevel": 2},
            {"wordBankId": "650ab431c748f750285942e2", "name": "Dog", "priority": 4, "category": "animals", "image": "dog.svg", "is_audio": True, "wordLevel": 2},
            {"wordBankId": "650ab411c748f75028592835", "name": "Cat", "priority": 5,"category": "animals", "image": "cat.svg", "is_audio": True,  "wordLevel": 1},
            {"wordBankId": "650ab45fc748f75028596913", "name": "Milk", "priority": 6, "category": "food", "image": "milk.svg", "is_audio": True, "wordLevel": 1},
        ]
        return recommended_words
    except Exception as e:
        # Handle any errors or exceptions that may occur during processing
        print("Error:", str(e))
        return {"error": str(e)}
