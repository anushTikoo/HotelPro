import { useEffect, useState, lazy, Suspense } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { FaChartPie, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;
const OccupancyChart = lazy(()=> import("../../components/OccupancyChart.jsx"));
const RevenueChart = lazy(()=>import("../../components/RevenueChart.jsx"));
const BookingsChart = lazy(()=>import("../../components/BookingsChart.jsx"));

function Dashboard() {
  const [occupancyPercentage, setOccupancyPercentage] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(false);
  const currentDate = new Date();
  const formattedMonth = currentDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  const [monthCount, setMonthCount] = useState(null);
  const [currentGraph, setCurrentGraph] = useState("occupancy");

  useEffect(() => {
    if (error) {
      if (!toast.isActive(1)) toast.error("Unexpected Error", { toastId: 1 });
    }
  }, [error]);

  const fetchOccupancy = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard/occupancy`);
      setOccupancyPercentage(res.data.occupancy_percentage);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard/revenue`);
      setMonthlyRevenue(res.data);

      const total = res.data.reduce((sum, item) => sum + item.revenue, 0);
      setTotalRevenue(total);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const fetchMontlyBookings = async () => {
    const res = await axios.get(`${API_BASE}/dashboard/bookings/monthly`);
    setBookings(res.data);
  };

  useEffect(() => {
    fetchOccupancy();
    fetchRevenue();
    fetchMontlyBookings();
  }, []);

  useEffect(() => {
    if (bookings.length) {
      const monthData = bookings.find((b) => b.period === formattedMonth);
      setMonthCount(monthData ? monthData.count : 0);
    }else{
      setMonthCount(0);
    }
  }, [bookings, formattedMonth]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-8">
        <ToastContainer autoClose={2500} position="top-center" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
              <MdTrendingUp className="text-teal-600" />
              Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => setCurrentGraph("occupancy")}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                currentGraph === "occupancy"
                  ? "bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-2xl shadow-teal-500/50 scale-105"
                  : "bg-white/95 text-gray-800 shadow-lg hover:shadow-xl"
              } rounded-2xl p-6 border-2 ${
                currentGraph === "occupancy"
                  ? "border-teal-400"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    currentGraph === "occupancy" ? "bg-white/20" : "bg-teal-50"
                  }`}
                >
                  <FaChartPie
                    className={`w-6 h-6 ${
                      currentGraph === "occupancy"
                        ? "text-white"
                        : "text-teal-600"
                    }`}
                  />
                </div>
                {currentGraph === "occupancy" && (
                  <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <h2
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "occupancy"
                    ? "text-teal-100"
                    : "text-gray-600"
                }`}
              >
                Occupancy Rate
              </h2>
              <p className="text-4xl font-bold">
                {occupancyPercentage !== null
                  ? `${occupancyPercentage}%`
                  : "Loading..."}
              </p>
            </div>

            <div
              onClick={() => setCurrentGraph("revenue")}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                currentGraph === "revenue"
                  ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/50 scale-105"
                  : "bg-white/95 backdrop-blur-md text-gray-800 shadow-lg hover:shadow-xl"
              } rounded-2xl p-6 border-2 ${
                currentGraph === "revenue"
                  ? "border-emerald-400"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    currentGraph === "revenue" ? "bg-white/20" : "bg-emerald-50"
                  }`}
                >
                  <FaMoneyBillWave
                    className={`w-6 h-6 ${
                      currentGraph === "revenue"
                        ? "text-white"
                        : "text-emerald-600"
                    }`}
                  />
                </div>
                {currentGraph === "revenue" && (
                  <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <h2
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "revenue"
                    ? "text-emerald-100"
                    : "text-gray-600"
                }`}
              >
                Total Revenue
              </h2>
              <p className="text-4xl font-bold">
                {totalRevenue !== null
                  ? `₹${totalRevenue.toLocaleString()}`
                  : "Loading..."}
              </p>
            </div>

            <div
              onClick={() => setCurrentGraph("bookings")}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                currentGraph === "bookings"
                  ? "bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl shadow-blue-500/50 scale-105"
                  : "bg-white/95 text-gray-800 shadow-lg hover:shadow-xl"
              } rounded-2xl p-6 border-2 ${
                currentGraph === "bookings"
                  ? "border-emerald-400"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${
                    currentGraph === "bookings" ? "bg-white/20" : "bg-blue-50"
                  }`}
                >
                  <FaCalendarCheck
                    className={`w-6 h-6 ${
                      currentGraph === "bookings"
                        ? "text-white"
                        : "text-emerald-600"
                    }`}
                  />
                </div>
                {currentGraph === "bookings" && (
                  <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                    Active
                  </span>
                )}
              </div>
              <h2
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "bookings"
                    ? "text-blue-100"
                    : "text-gray-600"
                }`}
              >
                Bookings ({formattedMonth})
              </h2>
              <p className="text-4xl font-bold">
                {monthCount !== null ? monthCount : "Loading..."}
              </p>
            </div>
          </div>

          <div className="bg-white/95 rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {currentGraph === "occupancy" && (
                <>
                  <FaChartPie className="text-teal-600" />
                  Occupancy Distribution
                </>
              )}
              {currentGraph === "revenue" && (
                <>
                  <FaMoneyBillWave className="text-emerald-600" />
                  Monthly Revenue Breakdown
                </>
              )}
              {currentGraph === "bookings" && (
                <>
                  <FaCalendarCheck className="text-emerald-600" />
                  Monthly Bookings Trend
                </>
              )}
            </h2>

            <div className="flex justify-center items-center">
              {currentGraph === "occupancy" && <Suspense fallback={<div>Loading…</div>}><OccupancyChart occupancyPercentage={occupancyPercentage}/></Suspense>}
              {currentGraph === "revenue" && <Suspense fallback={<div>Loading…</div>}><RevenueChart monthlyRevenue={monthlyRevenue}/></Suspense>}
              {currentGraph === "bookings" && <Suspense fallback={<div>Loading…</div>}><BookingsChart bookings={bookings}/></Suspense>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;