from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import re  # For regular expression matching
from app.database import get_db
from app.models import Item
from app.schemas import ItemCreate, ItemResponse ,ItemUpdate

router = APIRouter(prefix="/items", tags=["items"])

# Validate IP Address using a regex
def is_valid_ip(ip: str) -> bool:
    # Basic IPv4 validation (simple regex, can be more complex if needed)
    ip_pattern = re.compile(r"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$")
    return bool(ip_pattern.match(ip))

# Validate Status (only 'up' or 'down' are valid)
def is_valid_status(status: str) -> bool:
    return status.lower() in ['up', 'down']

@router.post("/", response_model=ItemResponse)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    # Validate IP
    if not is_valid_ip(item.ip):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid IP address format. Please enter a valid IP."
        )
    
    # Validate Jail Name
    if not item.jail_name or len(item.jail_name.strip()) < 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Jail name is required and should have at least 3 characters."
        )

    # Validate Status
    if not is_valid_status(item.status):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status must be either 'up' or 'down'."
        )
    
    # If all validations pass, create the new item
    new_item = Item(ip=item.ip, jail_name=item.jail_name, status=item.status)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@router.get("/", response_model=list[ItemResponse])
def get_all_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

@router.get("/{item_id}", response_model=ItemResponse)
def get_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.put("/{item_id}")
async def update_item(item_id: int, item: ItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(Item).filter(Item.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Update the fields
    db_item.ip = item.ip
    db_item.jail_name = item.jail_name
    db_item.status = item.status

    db.commit()
    db.refresh(db_item)

    return db_item
