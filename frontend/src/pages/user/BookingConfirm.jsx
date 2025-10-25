import { useContext, useEffect } from "react";
import { SearchContext } from "./SearchContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  FaBed,
  FaCalendarAlt,
  FaUsers,
  FaDoorOpen,
  FaRupeeSign,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import axios from "axios";
import { AuthContext } from "../../auth/Authorization";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function BookingConfirm() {
  const { data } = useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const room_no = searchParams.get("room_no");
  const room_type = searchParams.get("room_type")?.toUpperCase();
  const room_price = searchParams.get("room_price");
  const room_id = searchParams.get("room_id");

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const formatDate = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const checkIn = new Date(data?.checkIn);
  const checkOut = new Date(data?.checkOut);
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))+1;
  const totalPrice = room_price * nights;

  const handleConfirm = async () => {
    try {
      await axios.post(`${API_BASE}/bookings/`, {
        user_id: user.id,
        room_id: room_id,
        checkin: formatDate(checkIn),
        checkout: formatDate(checkOut),
        total_people: data.people,
      });
      navigate("/guest/home?booking=true");
    } catch (err) {
      navigate("/guest/home?booking=false");
    }
  };

  useEffect(() => {
    if (data === null) navigate("/guest/home?booking=false");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <Header />
      <main className="fixed inset-0 top-20 bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex items-center justify-center px-4 overflow-hidden">
        <div className="max-w-xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden hover:shadow-teal-500/20 transition-all duration-500">

          <div className="bg-gradient-to-r from-teal-600 via-teal-600 to-emerald-600 p-4 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <FaDoorOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold drop-shadow-md">Room {room_no}</h2>
                <p className="text-teal-100 text-xs font-medium">
                  {room_type?.charAt(0).toUpperCase() + room_type?.slice(1)}
                </p>
              </div>
            </div>
            <div className="text-right relative">
              <p className="text-xs text-teal-100 font-medium">Per Night</p>
              <p className="text-xl font-bold flex items-center justify-end drop-shadow-md">
                <FaRupeeSign className="w-4 h-4" />
                {room_price}
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <div className="group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarAlt className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wide">
                    Check In
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {checkIn.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarAlt className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wide">
                    Check Out
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {checkOut.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FaUsers className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wide">
                    Guests
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {data?.people} {data?.people === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
              </div>

              <div className="group flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <div className="bg-white p-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <FaBed className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-semibold uppercase tracking-wide">
                    Duration
                  </p>
                  <p className="text-xs font-bold text-gray-800">
                    {nights} {nights === 1 ? "Night" : "Nights"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-gray-300"></div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-xl p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Total Amount</p>
                <p className="text-xs text-gray-500">
                  ₹{room_price} x {nights} {nights === 1 ? "night" : "nights"}
                </p>
              </div>
              <p className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                <FaRupeeSign className="w-5 h-5" />
                {totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleConfirm}
              className="group relative w-full cursor-pointer bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-white font-bold text-lg py-5 rounded-xl shadow-2xl hover:shadow-amber-500/50 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-3 transition-all duration-300 border-2 border-amber-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              <MdVerified className="w-6 h-6 group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-500 relative drop-shadow-lg" />
              <span className="relative z-10 drop-shadow-lg tracking-wide">CONFIRM BOOKING</span>
            </button>

          </div>
        </div>
      </main>
    </>
  );
}

export default BookingConfirm;