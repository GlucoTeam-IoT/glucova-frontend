import { useEffect, useState, useCallback } from "react";
import { getDashboardData } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboard.types";
import SummaryCard from "../components/SummaryCard";
import RecentAlerts from "../components/RecentAlerts";
import RecentGlucoseRecords from "../components/RecentGlucoseRecords";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { motion } from "motion/react";

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Set up automatic refresh every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading || !data) {
    return <LoadingSpinner size="large" fullPage />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">
            Actualización automática cada 30s
          </span>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Glucose Card */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {data.vitals.map((vital) => (
            <div key={vital.label} className="h-full">
              <SummaryCard vital={vital} />
            </div>
          ))}
        </motion.div>

        {/* Right Column - Recent Records */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <RecentGlucoseRecords records={data.recentGlucoseRecords || []} />
        </motion.div>
      </div>

      {/* Bottom Section - Alerts */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <RecentAlerts alerts={data.alerts} />
      </motion.div>
    </div>
  );
};

export default DashboardPage;
