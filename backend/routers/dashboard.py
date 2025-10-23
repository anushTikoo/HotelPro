from fastapi import APIRouter, Depends
from database import get_db

router = APIRouter()

@router.get("/occupancy")
async def get_occupancy(db = Depends(get_db)):
    total_rooms = await db.fetchval("SELECT COUNT(*) FROM rooms")
    occupied_rooms = await db.fetchval("SELECT COUNT(*) FROM rooms WHERE status = 'occupied'")
    available_rooms = total_rooms - occupied_rooms
    occupancy_percentage = (occupied_rooms / total_rooms * 100) if total_rooms > 0 else 0

    return {
        "total_rooms": total_rooms,
        "occupied_rooms": occupied_rooms,
        "available_rooms": available_rooms,
        "occupancy_percentage": round(occupancy_percentage, 2)
    }

@router.get("/revenue")
async def get_revenue(db = Depends(get_db)):
    revenue_data = await db.fetch(
        """
        SELECT
            TO_CHAR(b.checkin, 'Mon YYYY') as month,
            SUM(r.price * (b.checkout - b.checkin + 1)) as revenue
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        WHERE b.checkin >= NOW() - INTERVAL '12 months'
        GROUP BY TO_CHAR(b.checkin, 'Mon YYYY'), DATE_TRUNC('month', b.checkin)
        ORDER BY DATE_TRUNC('month', b.checkin)
        """
    )
    return [{"month": row['month'], "revenue": float(row['revenue'])} for row in revenue_data]

@router.get("/bookings/monthly")
async def get_monthly_bookings(db = Depends(get_db)):
    bookings_data = await db.fetch(
        """
        SELECT
            TO_CHAR(checkin, 'Mon YYYY') as period,
            COUNT(*) as count
        FROM bookings
        WHERE checkin >= NOW() - INTERVAL '12 months'
        GROUP BY TO_CHAR(checkin, 'Mon YYYY'), DATE_TRUNC('month', checkin)
        ORDER BY DATE_TRUNC('month', checkin)
        """
    )
    return [{"period": row['period'], "count": row['count']} for row in bookings_data]