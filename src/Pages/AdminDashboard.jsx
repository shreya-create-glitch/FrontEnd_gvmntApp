// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   LabelList,
// } from "recharts";

// const AdminDashboard = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:1000/analytics", {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });

//         const { totalComplaint, pending, resolved } = res.data;

//         setChartData([
//           { name: "Total", value: totalComplaint },
//           { name: "Resolved", value: resolved },
//           { name: "Pending", value: pending },
//         ]);
//       } catch (error) {
//         console.error("Error fetching chart data:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (!chartData) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//         📊 Complaint Overview
//       </h2>

//       <div className="bg-white p-6 rounded-xl shadow">
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis allowDecimals={false} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#6366f1">
//               <LabelList dataKey="value" position="top" />
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const AdminDashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // Use backend URL from environment variable
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const res = await axios.get(`${backendUrl}/analytics`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const { totalComplaint, pending, resolved } = res.data;

        setChartData([
          { name: "Total", value: totalComplaint },
          { name: "Resolved", value: resolved },
          { name: "Pending", value: pending },
        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchStats();
  }, []);

  if (!chartData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📊 Complaint Overview
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#6366f1">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
