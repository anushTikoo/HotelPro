from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserSignup(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class RoomCreate(BaseModel):
    room_no: int
    type: str
    price: int
    status: str = "available"

class RoomUpdate(BaseModel):
    room_no: Optional[int] = None
    type: Optional[str] = None
    price: Optional[int] = None
    status: Optional[str] = None

class RoomSearch(BaseModel):
    checkin: date
    checkout: date
    total_people: int
    type: Optional[str] = None

class BookingCreate(BaseModel):
    user_id: int
    room_id: int
    checkin: date
    checkout: date
    total_people: int

class StaffCreate(BaseModel):
    name: str
    role: str
    phone: str
    shift: str

class StaffUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    phone: Optional[str] = None
    shift: Optional[str] = None