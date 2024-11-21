from sqlalchemy import Column, Integer, String
from app.database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ip = Column(String(255), nullable=False)  
    jail_name = Column(String(255), nullable=False)  
    status = Column(String(50), nullable=False)  
