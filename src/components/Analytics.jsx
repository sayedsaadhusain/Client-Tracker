
import React, { useMemo } from "react";
import { useOutreach } from "@/contexts/OutreachContext";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";

function Analytics() {
  const { outreaches } = useOutreach();

  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const weeklyData = weekDays.map(day => ({
    date: format(day, "EEE"),
    count: outreaches.filter(o => isSameDay(new Date(o.createdAt), day)).length
  }));

  const statusData = useMemo(() => {
    const statusCounts = outreaches.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value
    }));
  }, [outreaches]);

  const platformData = useMemo(() => {
    const platformCounts = outreaches.reduce((acc, curr) => {
      acc[curr.platform] = (acc[curr.platform] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(platformCounts).map(([name, value]) => ({
      name,
      value
    }));
  }, [outreaches]);

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  const totalOutreaches = outreaches.length;
  const successRate = totalOutreaches
    ? ((outreaches.filter(o => o.status === "Deal Done ✅").length / totalOutreaches) * 100).toFixed(1)
    : 0;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-500 mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-500 mb-4">Weekly Activity</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-500 mb-4">Status Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-500 mb-4">Platform Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-500 mb-4">Overall Performance</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Outreaches</p>
              <p className="text-3xl font-bold text-gray-500">{totalOutreaches}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Success Rate</p>
              <p className="text-3xl font-bold text-green-600">{successRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Deals Closed</p>
              <p className="text-3xl font-bold text-blue-600">
                {outreaches.filter(o => o.status === "Deal Done ✅").length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Analytics;
