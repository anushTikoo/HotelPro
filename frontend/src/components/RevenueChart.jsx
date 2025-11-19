import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis, YAxis,
    Bar,
    Rectangle,
    Tooltip
} from "recharts";

function RevenueChart({monthlyRevenue}) {
  return (
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
}

export default RevenueChart;