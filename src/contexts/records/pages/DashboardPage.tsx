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
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">
            Actualización automática cada 30s
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Glucose Card */}
        <div className="lg:col-span-1">
          {data.vitals.map((vital) => (
            <div key={vital.label} className="h-full">
              <SummaryCard vital={vital} />
            </div>
          ))}
        </div>

        {/* Right Column - Recent Records */}
        <div className="lg:col-span-2">
          <RecentGlucoseRecords records={data.recentGlucoseRecords || []} />
        </div>
      </div>

      {/* Bottom Section - Alerts */}
      <div className="w-full">
        <RecentAlerts alerts={data.alerts} />
      </div>
    </motion.div>
  );
};

export default DashboardPage;
