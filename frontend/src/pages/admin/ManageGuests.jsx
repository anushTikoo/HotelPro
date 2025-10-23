import Header from "../../components/Header";
import UserCard from "../../components/UserCard";
import { FaUserFriends } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Circles } from "react-loading-icons";
import Swal from "sweetalert2";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

function ManageGuests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/bookings/`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't Get Bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (id, no) => {
    const result = await Swal.fire({
      title: `Check Out Room ${no}?`,
      text: "The guest will be checked out and the room will become available.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Check Out",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      color: "#374151",
      iconColor: "#0d9488",
      customClass: {
        popup: "rounded-2xl shadow-2xl border-2 border-gray-200",
        title: "text-2xl font-bold text-gray-800",
        htmlContainer: "text-gray-600",
        confirmButton: "rounded-xl px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300",
        cancelButton: "rounded-xl px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-all duration-300",
      },
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/bookings/${id}`);
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
        toast.success(`Successfully Checked Out Room ${no}`);
      } catch (err) {
        console.error(err);
        toast.error("Couldn't Check Out");
      }
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <ToastContainer autoClose={2500} position="top-center" />

          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <FaUserFriends className="text-teal-600" />
              Manage Guests
            </h1>
            <p className="text-gray-600 mt-2">View and manage all guest bookings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-8 py-4">
              <UserCard
                user="Guest Name"
                room="Room"
                dates="Check-in → Check-out"
                people="Guests"
                checkout="Action"
                className="text-gray-700 font-bold text-sm uppercase"
              />
            </div>

            <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
              {bookings.length === 0 ? (
                <div className="py-16">
                  {loading ? (
                    <Circles
                      stroke="#0d9488"
                      className="w-16 h-16 block mx-auto"
                    />
                  ) : (
                    <div className="text-center">
                      <FaUserFriends className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        No active bookings
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Guest bookings will appear here
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="group bg-gray-50 hover:bg-teal-50 rounded-xl transition-all duration-300 p-4 border-2 border-gray-200 hover:border-teal-300 hover:shadow-md"
                  >
                    <UserCard
                      user={booking.user_name}
                      room={`Room ${booking.room_no}`}
                      dates={`${new Date(booking.checkin).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} → ${new Date(booking.checkout).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`}
                      people={booking.total_people}
                      checkout={
                        <button
                          onClick={() =>
                            handleCheckout(booking.id, booking.room_no)
                          }
                          className="group/btn cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                          <MdLogout className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          Check Out
                        </button>
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageGuests;