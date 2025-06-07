import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";
import type { DashboardData } from "../types/dashboard.types";
import SummaryCard from "../components/SummaryCard";
import RecentAlerts from "../components/RecentAlerts";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return <LoadingSpinner size="large" fullPage/>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

      {/* Cards resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.vitals.map((vital) => (
          <SummaryCard key={vital.label} vital={vital} />
        ))}
      </div>

      {/* Gráficas (placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white h-40 rounded-lg shadow p-4">
          <h2 className="font-semibold text-gray-700">Niveles de Glucosa</h2>
        </div>
        <div className="bg-white h-40 rounded-lg shadow p-4">
          <h2 className="font-semibold text-gray-700">Presión Arterial</h2>
        </div>
      </div>

      {/* Alertas recientes */}
      <RecentAlerts alerts={data.alerts} />
    </div>
  );
};

export default DashboardPage;
