import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Rectangle
} from "recharts";

function BookingsChart({bookings}) {
  return (
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
}

export default BookingsChart;