from sqlalchemy.sql.expression import null
from DataBase.database import Base
from sqlalchemy import String, Boolean, Integer, Column, Text


class Client(Base):  # SQLAlchemy model
    __tablename__ = 'Clients_Table'
    id = Column(Integer, primary_key=True)
    Prénom = Column(String(255), nullable=False, unique=True)
    Nom = Column(String(255), nullable=False)
    Email = Column(String(255))
    Région = Column(String(255))
    Profession = Column(String(255))
    Salaire = Column(Integer)
    Âge = Column(Integer)
    Genre = Column(String(255))


    def __repr__(self):
        return f"<Client Prénom={self.Prénom} Nom={self.Nom} Email={self.Email} Région={self.Région} Profession={self.Profession} Salaire={self.Salaire} Âge={self.Âge} Genre={self.Genre}>"
