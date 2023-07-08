import fastapi
from pydantic import BaseModel
from fastapi import APIRouter, status,HTTPException
from DataBase.database import SessionLocal
from DataBase.models.Item import Item as DBItem  
from typing import Optional, List
from sqlalchemy.orm import Session

router = fastapi.APIRouter()
db = SessionLocal()


class ItemBase(BaseModel):  #  Pydantic model
    id: int
    name: str
    description: str
    price: int
    on_offer: bool

    class Config:
        orm_mode = True


# API to get all the items
@router.get('/AllItems', response_model=List[ItemBase], status_code=200)
def get_all_items():
    items = db.query(DBItem).all()  
    return items


# API to create a new item
@router.post('/CreateItem', response_model=ItemBase, status_code=status.HTTP_201_CREATED) 
def create_an_item(item: ItemBase):
    db_item = db.query(DBItem).filter(DBItem.name == item.name).first()

    if db_item is not None:
        raise HTTPException(status_code=400,detail="Item already exists")
    new_item = DBItem(  
        id=item.id,
        name=item.name,
        price=item.price,
        description=item.description,
        on_offer=item.on_offer
    )
    db.add(new_item)
    db.commit()
    return new_item



# API to update an item
@router.put('/item/{item_id}',response_model=ItemBase,status_code=status.HTTP_200_OK)
def update_an_item(item_id:int,item:ItemBase):
    item_to_update = db.query(DBItem).filter(DBItem.id == item_id).first()
    item_to_update.name=item.name
    item_to_update.price=item.price
    item_to_update.description=item.description
    item_to_update.on_offer=item.on_offer

    db.commit()
    return item_to_update



# API to delete an item
@router.delete('/item/{item_id}')
def delete_item(item_id:int):
    item_to_delete=db.query(DBItem).filter(DBItem.id==item_id).first()

    if item_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Resource Not Found")
    
    db.delete(item_to_delete)
    db.commit()
    return item_to_delete


