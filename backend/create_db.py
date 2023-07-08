from DataBase.database import Base,engine
from DataBase.models.Item import Item
from DataBase.models.Client import Client


print("Creating database ....")

Base.metadata.create_all(engine)