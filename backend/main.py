from fastapi import FastAPI,status,HTTPException,Request
from typing import Optional,List
from DataBase.database import SessionLocal

from fastapi.middleware.cors import CORSMiddleware


from API import Item
from API import Client



app=FastAPI()

app.include_router(Item.router)
app.include_router(Client.router)


db=SessionLocal()


app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["http://localhost:3000"],  # This should be replaced with the appropriate frontend URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
=======
    allow_origins=["http://localhost:8080"],  # Replace with the appropriate frontend URL
    allow_credentials=True,
    allow_methods=["*"],
>>>>>>> origin/main
    allow_headers=["*"],
)

@app.get("/helloGit")
def helloGit():
        return ({"message":"/helloGit"})




