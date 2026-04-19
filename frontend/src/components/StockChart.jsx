import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function StockChart({ data }) {
  if (!data) return null;

  return (
    <div style={{ width: "90%", height: 400, margin: "auto" }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Axes */}
          <XAxis dataKey="date" />
          <YAxis />

          {/* Tooltip */}
          <Tooltip />

          {/* ✅ THIS IS WHERE YOUR LINE GOES */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#4ade80"
            strokeWidth={2}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;