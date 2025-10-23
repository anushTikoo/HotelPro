import { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import {
  Pie,
  PieChart,
  Tooltip,
  BarChart,
  Rectangle,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartPie, FaMoneyBillWave, FaCalendarCheck } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const API_BASE = import.meta.env.VITE_BACKEND_API_BASEURL;

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
      if (!toast.isActive(1)) {
        toast.error("Unexpected Error", { toastId: 1 });
      }
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

  const COLORS = {
    occupied: "#0d9488",
    unoccupied: "#ff474c",
  };

  const showOccupancy = () => (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={[
            { name: "Occupied", value: occupancyPercentage },
            { name: "Unoccupied", value: 100 - occupancyPercentage },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={140}
          paddingAngle={5}
          dataKey="value"
        >
          <Cell fill={COLORS.occupied} />
          <Cell fill={COLORS.unoccupied} />
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #0d9488",
            borderRadius: "12px",
            padding: "10px",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ paddingTop: "20px" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const showRevenue = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={monthlyRevenue}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #0d9488",
            borderRadius: "12px",
            padding: "10px",
          }}
          cursor={{ fill: "rgba(13, 148, 136, 0.1)" }}
        />
        <Bar
          dataKey="revenue"
          fill="url(#colorRevenue)"
          radius={[8, 8, 0, 0]}
          activeBar={<Rectangle fill="#f59e0b" stroke="#d97706" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const showBookings = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={bookings}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="period"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "2px solid #059669",
            borderRadius: "12px",
            padding: "10px",
          }}
          cursor={{ fill: "rgba(5, 150, 105, 0.1)" }}
        />
        <Bar
          dataKey="count"
          fill="url(#colorBookings)"
          radius={[8, 8, 0, 0]}
          activeBar={<Rectangle fill="#f59e0b" stroke="#d97706" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              onClick={() => setCurrentGraph("occupancy")}
              className={`group cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                currentGraph === "occupancy"
                  ? "bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-2xl shadow-teal-500/50 scale-105"
                  : "bg-white/95 backdrop-blur-md text-gray-800 shadow-lg hover:shadow-xl"
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
              <h3
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "occupancy"
                    ? "text-teal-100"
                    : "text-gray-600"
                }`}
              >
                Occupancy Rate
              </h3>
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
              <h3
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "revenue"
                    ? "text-emerald-100"
                    : "text-gray-600"
                }`}
              >
                Total Revenue
              </h3>
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
                  : "bg-white/95 backdrop-blur-md text-gray-800 shadow-lg hover:shadow-xl"
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
              <h3
                className={`text-lg font-semibold mb-2 ${
                  currentGraph === "bookings"
                    ? "text-blue-100"
                    : "text-gray-600"
                }`}
              >
                Bookings ({formattedMonth})
              </h3>
              <p className="text-4xl font-bold">
                {monthCount !== null ? monthCount : "Loading..."}
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-8">
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
              {currentGraph === "occupancy" && showOccupancy()}
              {currentGraph === "revenue" && showRevenue()}
              {currentGraph === "bookings" && showBookings()}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
