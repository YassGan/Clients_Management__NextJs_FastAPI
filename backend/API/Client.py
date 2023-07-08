import fastapi
from pydantic import BaseModel
from fastapi import APIRouter, status, HTTPException
from DataBase.database import SessionLocal
from DataBase.models.Client import Client as DBClient
from typing import Optional, List
from sqlalchemy.orm import Session

router = fastapi.APIRouter()
db = SessionLocal()


class ClientBase(BaseModel):  # Pydantic model
    Prénom: str
    Nom: str
    Email: str
    Région: str
    Profession: str
    Salaire: int
    Âge: int
    Genre: str

    class Config:
        orm_mode = True


# API to create a new Client
@router.post('/CreateClient', response_model=ClientBase, status_code=status.HTTP_201_CREATED)
def create_an_Client(Client: ClientBase):
    db_Client = db.query(DBClient).filter(DBClient.Prénom == Client.Prénom).first()

    if db_Client is not None:
        raise HTTPException(status_code=400, detail="Client already exists")
    new_Client = DBClient(
        Prénom=Client.Prénom,
        Nom=Client.Nom,
        Email=Client.Email,
        Région=Client.Région,
        Profession=Client.Profession,
        Salaire=Client.Salaire,
        Âge=Client.Âge,
        Genre=Client.Genre
    )
    db.add(new_Client)
    db.commit()
    return new_Client




# API to delete an existing Client
@router.delete('/DeleteClient/{client_email}')
def delete_client(client_email: str):
    client_to_delete = db.query(DBClient).filter(DBClient.Email == client_email).first()
    if client_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client Not Found")
    db.delete(client_to_delete)
    db.commit()
    return client_to_delete



# API to get all the clients
@router.get('/AllClients', response_model=List[ClientBase], status_code=200)
def get_all_clients():
    clients = db.query(DBClient).all()
    return clients


# API to update the client
@router.put('/UpdateClient/{client_email}')
def update_client(client_email: str, updated_client: ClientBase):
    db_client = db.query(DBClient).filter(DBClient.Email == client_email).first()

    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")

    db_client.Prénom = updated_client.Prénom
    db_client.Nom = updated_client.Nom
    db_client.Région = updated_client.Région
    db_client.Profession = updated_client.Profession
    db_client.Salaire = updated_client.Salaire
    db_client.Âge = updated_client.Âge
    db_client.Genre = updated_client.Genre

    db.commit()

    return db_client
