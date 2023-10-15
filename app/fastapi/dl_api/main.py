from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from routers import audio

app = FastAPI()

origins = ["*"] # development only

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audio.router)

# information about FastAPI setup: 

# https://fastapi.tiangolo.com/tutorial/body/

# run the server in bash with:
# uvicorn main:app --reload