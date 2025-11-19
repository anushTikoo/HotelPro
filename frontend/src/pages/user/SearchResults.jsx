import Header from "../../components/Header";
import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;
const RoomCard = lazy(() => import("../../components/RoomCard.jsx"));

function SearchResults() {
  const [rooms, setRooms] = useState([]);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [roomType, setRoomType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    setLoading(true);
    try {
      if (roomType === null) {
        const res = await axios.get(
          `${API_BASE}/rooms/available?price=${maxPrice}`
        );
        setRooms(res.data);
      } else {
        const res = await axios.get(
          `${API_BASE}/rooms/available?price=${maxPrice}&type=${roomType}`
        );
        setRooms(res.data);
      }
    } catch (err) {
      console.error(err);
      if (!toast.isActive(1))
        toast.error("Couldn't Get Rooms, Please Try Again", { toastId: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <>
      <Header fetchPriority="high" />
      <div
        className={`flex bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 flex-col gap-10 items-center w-full ${
          rooms.length > 6 ? "h-auto" : "min-h-screen"
        } py-8`}
      >
        <ToastContainer position="top-center" autoClose={2500} />
        <div className="bg-white/80 rounded-2xl shadow-xl border border-gray-200/60 p-6 mb-4 mx-4 lg:mx-auto max-w-7xl flex place-content-between items-center w-4/5 gap-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
            Filters:
          </h2>

          <div className="flex flex-col gap-2 flex-1">
            <label
              htmlFor="priceRange"
              className="text-sm font-semibold text-gray-700 tracking-wide"
            >
              Maximum Price:{" "}
              <span className="text-teal-600 font-bold">₹{maxPrice}</span>
            </label>
            <input
              id="priceRange"
              className="cursor-pointer w-full h-2 bg-gradient-to-r from-teal-200 to-teal-400 rounded-full appearance-none accent-teal-600 hover:accent-teal-700 transition-all"
              type="range"
              max="30000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-center">
            <p className="text-sm font-semibold text-gray-700">Room Type:</p>

            <label className="relative cursor-pointer">
              <input
                className="peer sr-only"
                id="1"
                type="radio"
                name="type"
                value="Single"
                checked={roomType === "Single"}
                onChange={(e) => setRoomType(e.target.value)}
              />
              <div className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 text-sm font-medium transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-teal-600 peer-checked:to-emerald-600 peer-checked:text-white peer-checked:border-teal-600 peer-checked:shadow-lg peer-checked:scale-105 hover:border-teal-400">
                Single
              </div>
            </label>

            <label className="relative cursor-pointer">
              <input
                className="peer sr-only"
                id="2"
                type="radio"
                name="type"
                value="Double"
                checked={roomType === "Double"}
                onChange={(e) => setRoomType(e.target.value)}
              />
              <div className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 text-sm font-medium transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-teal-600 peer-checked:to-emerald-600 peer-checked:text-white peer-checked:border-teal-600 peer-checked:shadow-lg peer-checked:scale-105 hover:border-teal-400">
                Double
              </div>
            </label>

            <label className="relative cursor-pointer">
              <input
                className="peer sr-only"
                id="3"
                type="radio"
                name="type"
                value="Suite"
                checked={roomType === "Suite"}
                onChange={(e) => setRoomType(e.target.value)}
              />
              <div className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 text-sm font-medium transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-teal-600 peer-checked:to-emerald-600 peer-checked:text-white peer-checked:border-teal-600 peer-checked:shadow-lg peer-checked:scale-105 hover:border-teal-400">
                Suite
              </div>
            </label>

            <label className="relative cursor-pointer">
              <input
                className="peer sr-only"
                id="4"
                type="radio"
                name="type"
                value="All"
                checked={roomType === null}
                onChange={(e) => setRoomType(null)}
              />
              <div className="px-4 py-2 rounded-xl bg-gray-100 border-2 border-gray-200 text-gray-600 text-sm font-medium transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-teal-600 peer-checked:to-emerald-600 peer-checked:text-white peer-checked:border-teal-600 peer-checked:shadow-lg peer-checked:scale-105 hover:border-teal-400">
                All
              </div>
            </label>
          </div>

          <button
            onClick={handleFilter}
            className="px-8 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold shadow-md hover:shadow-lg hover:from-teal-700 hover:to-teal-800 active:scale-95 transition-all duration-300"
          >
            Apply
          </button>
        </div>

        {rooms.length === 0 ? (
          loading ? (
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="60"
                strokeDashoffset="15"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <p className="text-gray-600 text-lg col-span-3 text-center font-medium">
              No rooms found for the selected filters.
            </p>
          )
        ) : (
          <Suspense>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-4/5 max-w-7xl">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room_no={room.room_no}
                  room_type={room.type}
                  room_price={room.price}
                  room_id={room.id}
                />
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}

export default SearchResults;
