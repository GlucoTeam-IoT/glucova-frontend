import { useEffect, useState } from "react";
import { getHealthHistory } from "../services/healthHistoryService";
import type { HealthRecord } from "../types/healthHistory.types";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import HealthHistoryFilters from "../components/HealthHistoryFilter";
import HealthHistoryTable from "../components/HealthHistoryTable";

const HealthHistoryPage = () => {
  const [, setRecords] = useState<HealthRecord[]>([]); // Fixed: Added missing variable name
  const [filtered, setFiltered] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (limit = 100, skip = 0) => {
    setLoading(true);
    try {
      const data = await getHealthHistory(limit, skip);
      setRecords(data || []); // Ensure we set an empty array if data is undefined
      setFiltered(data || []);
    } catch (error) {
      console.error("Error loading health records:", error);
      setRecords([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (limit: number) => {
    setLoading(true);

    // Reload data with new limit
    const fetchAndFilter = async () => {
      try {
        const data = await getHealthHistory(limit);
        let filteredData = [...(data || [])];

        setFiltered(filteredData);
      } catch (error) {
        console.error("Error filtering records:", error);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilter();
  };

  if (loading) return <LoadingSpinner size="large" fullPage />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Historial Médico</h1>
      <HealthHistoryFilters onFilter={applyFilters} />
      <HealthHistoryTable records={filtered} />
    </div>
  );
};

export default HealthHistoryPage;
