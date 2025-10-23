import Header from "../../components/Header";
import AdminRoomCard from "../../components/AdminRoomCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Circles } from "react-loading-icons";
import { FaPlus, FaBed } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import Swal from "sweetalert2";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const action = searchParams.get("action");

  const getRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/rooms/`);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed To Get Rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, no) => {
    const result = await Swal.fire({
      title: `Delete Room ${no}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d9488",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      color: "#374151",
      iconColor: "#f59e0b",
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
        await axios.delete(`${API_BASE}/rooms/${id}`);
        setRooms((prev) => prev.filter((item) => item.id !== id));
        toast.success(`Room ${no} Deleted Ducessfully`)
      } catch (err) {
        try {
          if (err.response.status === 409) toast.error(err.response.data.detail)
        } catch (err) {
          toast.error("Unexpected Error");
        }
        console.error(err);
      }
    }
  };

  const handleEdit = (id, no, type, status, price) => {
    if (status === "occupied") toast.warn("Cannot Edit Occupied Rooms");
    else
      navigate(
        `/admin/editaddroom?for=edit&id=${id}&room_no=${no}&type=${type}&status=${status}&price=${price}`
      );
  };

  useEffect(() => {
    getRooms();
    if (action === "update") toast.success("Room Updated Successfully");
    else if (action === "add") toast.success("Room Added Successfully");
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-8">
        <div className="max-w-6xl mx-auto px-6">
          <ToastContainer autoClose={2500} position="top-center" />

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                <MdMeetingRoom className="text-teal-600" />
                Manage Rooms
              </h1>
              <p className="text-gray-600 mt-2">
                View and manage all hotel rooms
              </p>
            </div>
            <Link
              to="/admin/editaddroom?for=add"
              className="group flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-700 hover:to-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Add Room
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-8 py-4">
              <AdminRoomCard
                no="Room No."
                type="Type"
                status="Status"
                price="Price"
                action="Actions"
                className="text-gray-700 font-bold text-sm uppercase"
              />
            </div>

            <div className="p-6 space-y-3 max-h-[600px] overflow-y-auto">
              {rooms.length === 0 ? (
                <div className="py-16">
                  {loading ? (
                    <Circles
                      stroke="#0d9488"
                      className="w-16 h-16 block mx-auto"
                    />
                  ) : (
                    <div className="text-center">
                      <FaBed className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-600 text-lg font-medium">
                        No rooms found
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    className="group bg-gray-50 hover:bg-teal-50 rounded-xl transition-all duration-300 p-4 border-2 border-gray-200 hover:border-teal-300 hover:shadow-md"
                  >
                    <AdminRoomCard
                      no={room.room_no}
                      type={room.type}
                      status={room.status}
                      price={`₹${room.price}`}
                      action={
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() =>
                              handleEdit(
                                room.id,
                                room.room_no,
                                room.type,
                                room.status,
                                room.price
                              )
                            }
                            className="px-5 cursor-pointer py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(room.id, room.room_no)}
                            className="cursor-pointer px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                          >
                            Delete
                          </button>
                        </div>
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
};

export default ManageRooms;