from fastapi import APIRouter, Depends, Query, HTTPException
from models import RoomCreate, RoomUpdate, RoomSearch
from database import get_db
from typing import List, Optional
import asyncpg

router = APIRouter()

@router.get("/available")
async def get_rooms(
    price: Optional[int] = Query(None),
    type: Optional[str] = Query(None),
    db=Depends(get_db)
):
    query = "SELECT * FROM rooms WHERE status = 'available'"
    params = []

    if price is not None:
        params.append(price)
        query += f" AND price <= ${len(params)}"

    if type is not None:
        params.append(type)
        query += f" AND LOWER(type) = LOWER(${len(params)})"

    query += " ORDER BY room_no"
    rooms = await db.fetch(query, *params)
    return [dict(room) for room in rooms]

@router.get("/")
async def get_all_rooms(db = Depends(get_db)):
    rooms = await db.fetch("SELECT * FROM rooms ORDER BY room_no")
    return [dict(room) for room in rooms]

@router.post("/")
async def create_room_by_type(room: RoomCreate, db = Depends(get_db)):
    try:
        new_room = await db.fetchrow(
        "INSERT INTO rooms (room_no, type, price, status) VALUES ($1, $2, $3, $4) RETURNING *",
        room.room_no, room.type, room.price, room.status)
        return dict(new_room)
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Room Already Exists!")

@router.put("/{room_id}")
async def update_room(room_id: int, room_update: RoomUpdate, db = Depends(get_db)):
    try:
        update_fields = []
        params = []
        param_count = 1

        update_fields.append(f"room_no = ${param_count}")
        if room_update.room_no is not None:
            params.append(room_update.room_no)
            param_count += 1

        update_fields.append(f"type = ${param_count}")
        if room_update.type is not None:
            params.append(room_update.type)
            param_count += 1

        if room_update.price is not None:
            update_fields.append(f"price = ${param_count}")
            params.append(room_update.price)
            param_count += 1

        if room_update.status is not None:
            update_fields.append(f"status = ${param_count}")
            params.append(room_update.status)
            param_count += 1

        params.append(room_id)
        query = f"UPDATE rooms SET {', '.join(update_fields)} WHERE id = ${param_count} RETURNING *"

        updated_room = await db.fetchrow(query, *params)
        return dict(updated_room)
    except asyncpg.exceptions.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Room Already Exists!")

@router.delete("/{room_id}")
async def delete_room(room_id: int, db = Depends(get_db)):
    try:
        await db.execute("DELETE FROM rooms WHERE id = $1", room_id)
        return {"message": "Room deleted"}
    except asyncpg.exceptions.ForeignKeyViolationError:
        raise HTTPException(status_code=409, detail="Occupied Room Cannot Be Deleted!")