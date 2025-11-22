import { Link } from "react-router-dom";

function RoomCard({ room_no, room_type, room_price, room_id }) {
  const handleType = () => {
    if (room_type === "single") return "/images/single_room.webp";
    else if (room_type === "double") return "/images/double_room.webp";
    else return "/images/suite.webp";
  }

  return (
    <div className="group transition-all duration-300 hover:-translate-y-2 ease-in bg-white text-[#2C2C2C] p-4 py-3 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-300 mb-6">
        <div className="flex gap-4 rounded-xl">
            <div className="flex-1">
                <h2 className="font-semibold text-xl text-[#2C2C2C] group-hover:text-teal-600 transition-colors duration-300">Room {room_no}</h2>

                <span className="inline-block mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                  {room_type.charAt(0).toUpperCase() + room_type.slice(1)}
                </span>

                <h2 className="mt-2">
                  <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-extrabold text-2xl">₹{room_price}</span>
                  <span className="text-gray-600 text-xs opacity-90">/night</span>
                </h2>
            </div>

            <div className="relative overflow-hidden rounded-lg w-33 h-22">
              <img
                loading = "lazy"
                className="border border-gray-200 shadow-sm rounded-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src={handleType()}
                alt={`${room_type} room`}
              />
            </div>
        </div>

        <Link to = {`/guest/bookingconfirm?room_no=${room_no}&room_type=${room_type}&room_price=${room_price}&room_id=${room_id}`} className="px-6 py-4 font-semibold text-white rounded-xl bg-gradient-to-b from-[#FFD23F] to-[#FFB300] shadow-lg hover:shadow-[#FFD23F]/40 hover:-translate-y-1 shadow-[#FFD23F]/30 transition-all duration-200 hover:from-[#FFB300] hover:to-[#FF9A00] hover:shadow-xl active:translate-y-0 active:shadow-md hover:scale-[1.02] ease-in-out mt-4 text-lg bg-linear-to-r text-shadow-xs cursor-pointer text-center flex items-center justify-center w-full hover:bg-linear-to-r">
          Book Now
        </Link>
    </div>
  )
}

export default RoomCard