import pymongo
import os 
import json
from bson import json_util
from dotenv import load_dotenv

# connecting to MongoDB Atlas:

# this requires a .env file to be set up with the data specified/formatted in the same way.

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

def open_mongodb():
    client = pymongo.MongoClient(MONGO_URI)
    db = client.DATABASE # replace with correct name
    collection = db.COLLECTION # replace with correct name

    return client, collection # allows for find() etc. to be used with collection. Remember to close() client after calling open_mongodb()