from fastapi import APIRouter, Depends
from models import BookingCreate
from database import get_db

router = APIRouter()

@router.post("/")
async def create_booking(booking: BookingCreate, db = Depends(get_db)):
    new_booking = await db.fetchrow(
        "INSERT INTO bookings (user_id, room_id, checkin, checkout, total_people) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        booking.user_id, booking.room_id, booking.checkin, booking.checkout, booking.total_people
    )

    await db.execute("UPDATE rooms SET status = 'occupied' WHERE id = $1", booking.room_id)

    return dict(new_booking)

@router.get("/")
async def get_all_bookings(db = Depends(get_db)):
    bookings = await db.fetch(
        """
        SELECT
            b.id, b.user_id, b.room_id, b.checkin, b.checkout, b.total_people,
            u.username as user_name,
            r.room_no, r.type as room_type, r.price
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN rooms r ON b.room_id = r.id
        ORDER BY r.room_no
        """
    )
    return [dict(b) for b in bookings]

@router.delete("/{booking_id}")
async def cancel_booking(booking_id: int, db = Depends(get_db)):
    booking = await db.fetchrow("SELECT room_id FROM bookings WHERE id = $1", booking_id)

    await db.execute("DELETE FROM bookings WHERE id = $1", booking_id)

    if booking:
        await db.execute("UPDATE rooms SET status = 'available' WHERE id = $1", booking['room_id'])

    return {"message": "Booking Cancelled"}