from pydantic import BaseModel

class ItemCreate(BaseModel):
    ip: str
    jail_name: str
    status: str

class ItemResponse(ItemCreate):
    id: int

    class Config:
        orm_mode = True


class ItemUpdate(BaseModel):
    ip: str
    jail_name: str
    status: str