import { useEffect, useState } from "react";
import { getHealthHistory } from "../services/healthHistoryService";
import type { HealthRecord } from "../types/healthHistory.types";
import HealthHistoryTable from "../components/HealthHystoryTable";
import HealthHistoryFilters from "../components/HealthHystoryFilter";

const HealthHistoryPage = () => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [filtered, setFiltered] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getHealthHistory();
      setRecords(data);
      setFiltered(data); // mostrar todo al inicio
      setLoading(false);
    };
    loadData();
  }, []);

  const applyFilters = (from: string, to: string, type: string) => {
    let filteredData = [...records];

    if (from) {
      filteredData = filteredData.filter((r) => r.date >= from);
    }
    if (to) {
      filteredData = filteredData.filter((r) => r.date <= to);
    }
    if (type !== "all") {
      filteredData = filteredData.filter((r) => {
        switch (type) {
          case "glucose":
            return r.glucose > 0;
          case "pressure":
            return r.pressure !== "";
          case "weight":
            return r.weight > 0;
          case "bmi":
            return r.bmi > 0;
          default:
            return true;
        }
      });
    }

    setFiltered(filteredData);
  };

  if (loading) return <p className="p-4">Cargando historial...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Historial Médico</h1>
      <HealthHistoryFilters onFilter={applyFilters} />
      <HealthHistoryTable records={filtered} />
    </div>
  );
};

export default HealthHistoryPage;
