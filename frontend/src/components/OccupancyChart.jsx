import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function OccupancyChart({occupancyPercentage}) {
  return (
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
          <Cell fill="#0d9488" />
          <Cell fill="#ff474c" />
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
}

export default OccupancyChart;