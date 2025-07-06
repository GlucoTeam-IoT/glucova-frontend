import { useEffect, useState } from "react";
import { getHealthHistory } from "../services/healthHistoryService";
import type { HealthRecord } from "../types/healthHistory.types";

import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import GenericFilters from "../../../shared/components/GenericFilters";
import GenericTable from "../../../shared/components/GenericTable";
import type { FilterField } from "../../../shared/components/GenericFilters";
import type { TableColumn } from "../../../shared/components/GenericTable";
import { Activity } from "lucide-react";
import { motion } from "motion/react";

const HealthHistoryPage = () => {
  const [, setRecords] = useState<HealthRecord[]>([]);
  const [filtered, setFiltered] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ limit: 100 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (limit = 100, skip = 0) => {
    setLoading(true);
    try {
      const data = await getHealthHistory(limit, skip);
      setRecords(data || []);
      setFiltered(data || []);
    } catch (error) {
      console.error("Error loading health records:", error);
      setRecords([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters: Record<string, any>) => {
    setLoading(true);

    // Update filters state
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Reload data with new limit
    const fetchAndFilter = async () => {
      try {
        const limit = updatedFilters.limit || 100;
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

  // Configure filter fields
  const filterFields: FilterField[] = [
    {
      name: "limit",
      label: "Registros a mostrar",
      type: "select",
      defaultValue: 100,
      options: [
        { value: 10, label: "10" },
        { value: 25, label: "25" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
      ],
    },
  ];

  // Configure table columns
  const tableColumns: TableColumn<HealthRecord>[] = [
    {
      key: "date",
      label: "Fecha",
      render: (_, item: HealthRecord) => {
        const date = new Date(item.timestamp);
        return date.toLocaleDateString();
      },
    },
    {
      key: "time",
      label: "Hora",
      render: (_, item: HealthRecord) => {
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      key: "device_id",
      label: "Dispositivo",
      render: (deviceId: string) => (
        <span className="font-medium">{deviceId.substring(0, 8)}...</span>
      ),
    },
    {
      key: "description",
      label: "Descripción",
    },
    {
      key: "level",
      label: "Nivel de Glucosa",
      render: (level: number) => {
        let levelClass = "";

        if (level < 70) {
          levelClass = "text-blue-600 bg-blue-100"; // Low
        } else if (level >= 70 && level <= 100) {
          levelClass = "text-green-600 bg-green-100"; // Normal
        } else if (level > 100 && level <= 125) {
          levelClass = "text-yellow-600 bg-yellow-100"; // Pre-diabetic/Elevated
        } else if (level > 125) {
          levelClass = "text-red-600 bg-red-100"; // High
        } else {
          levelClass = "text-gray-600 bg-gray-100"; // Unknown
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${levelClass}`}
          >
            {level} mg/dL
          </span>
        );
      },
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-semibold text-gray-800">Historial Médico</h1>

      <GenericFilters
        title="Filtrar registros"
        fields={filterFields}
        onFilterChange={applyFilters}
        initialFilters={filters}
      />

      {loading ? (
        <LoadingSpinner size="large" fullPage />
      ) : (
        <div className="mt-6">
          <GenericTable
            data={filtered}
            columns={tableColumns}
            emptyState={{
              icon: <Activity className="w-8 h-8 text-blue-600" />,
              title: "No hay registros disponibles",
              description:
                "Los registros médicos aparecerán aquí cuando estén disponibles",
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default HealthHistoryPage;
