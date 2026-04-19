import { useState } from "react";
import axios from "axios";
import StockChart from "./components/StockChart";

function App() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:5000/predict", {
        symbol,
      });
      setData(res.data);
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">📈 Stock Predictor</h1>

      {/* Input Section */}
      <div className="flex gap-3 mb-6 flex-wrap justify-center">

        {/* Dropdown */}
        <select
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600"
          onChange={(e) => setSymbol(e.target.value)}
        >
          <option value="AAPL">Apple (AAPL)</option>
          <option value="TSLA">Tesla (TSLA)</option>
          <option value="MSFT">Microsoft (MSFT)</option>
          <option value="GOOGL">Google (GOOGL)</option>
          <option value="RELIANCE.NS">Reliance (India)</option>
          <option value="TCS.NS">TCS (India)</option>
          <option value="INFY.NS">Infosys (India)</option>
          <option value="BTC-USD">Bitcoin</option>
        </select>

        {/* Manual Input */}
        <input
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Or type (e.g. NFLX, ETH-USD)"
        />

        {/* Button */}
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          {loading ? "Loading..." : "Predict"}
        </button>
      </div>

      {/* Data Card */}
      {data && (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-3xl">
          
          <h2 className="text-2xl font-semibold mb-4">{data.symbol}</h2>

          <div className="flex justify-between mb-4">
            <p>Current: ₹{data.current_price.toFixed(2)}</p>
            <p>Predicted: ₹{data.predicted_price.toFixed(2)}</p>
          </div>

          <h3
            className={`text-lg font-bold ${
              data.signal === "BUY" ? "text-green-400" : "text-red-400"
            }`}
          >
            {data.signal}
          </h3>

          {/* Chart */}
          <div className="mt-6">
            <StockChart data={data.history} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;