import { useState, useEffect } from "react";
import {
  getAlerts,
  createAlert,
  deleteAlert,
} from "../services/alertSettingsService";
import type {
  Alert,
  NewAlertData,
  AlertsFilter,
} from "../types/alertSettings.types";
import DeleteAlertModal from "../components/DeleteAlertModal";
import CreateAlertModal from "../components/CreateAlertModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import GenericFilters from "../../../shared/components/GenericFilters";
import GenericTable from "../../../shared/components/GenericTable";
import type { FilterField } from "../../../shared/components/GenericFilters";
import type {
  TableColumn,
  TableAction,
} from "../../../shared/components/GenericTable";
import { Plus, Bell, Trash2 } from "lucide-react";
import { getDevices } from "../../devices/services/devicesService";
import type { Device } from "../../devices/types/devices.types";
import { motion } from "motion/react";

const AlertSettingsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AlertsFilter>({
    limit: 100,
    skip: 0,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const devicesList = await getDevices();
      setDevices(devicesList);
    } catch (err) {
      console.error("Failed to load devices", err);
    }
  };

  const loadAlerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlerts(filters);
      setAlerts(data);
    } catch (err) {
      console.error("Failed to load alerts", err);
      setError(
        "No se pudieron cargar las alertas. Intente nuevamente más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlert = async (alertData: NewAlertData) => {
    try {
      setLoading(true);
      const newAlert = await createAlert(alertData);
      if (newAlert) {
        setAlerts([newAlert, ...alerts]);
        setShowCreateModal(false);
      }
    } catch (err) {
      console.error("Failed to create alert", err);
      setError("No se pudo crear la alerta. Intente nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (alert: Alert) => {
    setAlertToDelete(alert.id);
  };

  const handleDeleteConfirm = async () => {
    if (!alertToDelete) return;

    try {
      setLoading(true);
      const success = await deleteAlert(alertToDelete);
      if (success) {
        setAlerts(alerts.filter((alert) => alert.id !== alertToDelete));
      }
    } catch (err) {
      console.error("Failed to delete alert", err);
      setError("No se pudo eliminar la alerta. Intente nuevamente más tarde.");
    } finally {
      setLoading(false);
      setAlertToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setAlertToDelete(null);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Configure filter fields
  const filterFields: FilterField[] = [
    {
      name: "device_id",
      label: "Dispositivo",
      type: "select",
      options: [
        { value: "", label: "Todos los dispositivos" },
        ...devices.map((device) => ({
          value: device.id,
          label: `${device.id.substring(0, 8)}...`,
        })),
      ],
    },
    {
      name: "level",
      label: "Nivel",
      type: "select",
      options: [
        { value: "", label: "Todos los niveles" },
        { value: "low", label: "Bajo" },
        { value: "medium", label: "Medio" },
        { value: "high", label: "Alto" },
        { value: "critical", label: "Crítico" },
      ],
    },
    {
      name: "limit",
      label: "Mostrar",
      type: "select",
      defaultValue: 100,
      options: [
        { value: 10, label: "10 alertas" },
        { value: 25, label: "25 alertas" },
        { value: 50, label: "50 alertas" },
        { value: 100, label: "100 alertas" },
      ],
    },
  ];

  // Configure table columns
  const tableColumns: TableColumn<Alert>[] = [
    {
      key: "level",
      label: "Nivel",
      render: (level: string) => {
        let levelClass = "";
        let levelText = "";

        switch (level.toLowerCase()) {
          case "low":
            levelText = "Bajo";
            levelClass = "text-blue-600 bg-blue-100";
            break;
          case "medium":
            levelText = "Medio";
            levelClass = "text-yellow-600 bg-yellow-100";
            break;
          case "high":
            levelText = "Alto";
            levelClass = "text-red-600 bg-red-100";
            break;
          case "critical":
            levelText = "Crítico";
            levelClass = "text-red-700 bg-red-200";
            break;
          default:
            levelText = level.charAt(0).toUpperCase() + level.slice(1);
            levelClass = "text-gray-600 bg-gray-100";
        }

        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${levelClass}`}
          >
            {levelText}
          </span>
        );
      },
    },
    {
      key: "message",
      label: "Mensaje",
    },
    {
      key: "device_id",
      label: "Dispositivo",
      render: (deviceId: string) => (
        <span className="font-medium">{deviceId.substring(0, 8)}...</span>
      ),
    },
    {
      key: "date",
      label: "Fecha",
      render: (_, item: Alert) => {
        if (!item.timestamp) return "N/A";
        const date = new Date(item.timestamp);
        return date.toLocaleDateString();
      },
    },
    {
      key: "time",
      label: "Hora",
      render: (_, item: Alert) => {
        if (!item.timestamp) return "N/A";
        const date = new Date(item.timestamp);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
  ];

  // Configure table actions
  const tableActions: TableAction<Alert>[] = [
    {
      label: "Eliminar alerta",
      icon: <Trash2 size={18} />,
      onClick: handleDeleteClick,
      className: "p-1 text-red-500 hover:bg-red-50 rounded-full bg-white",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex mb-6 flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Alertas</h1>
          <p className="text-gray-600">Administra tus alertas de monitoreo</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Crear alerta
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md border border-red-200 mb-4">
          {error}
        </div>
      )}

      <GenericFilters
        title="Filtrar alertas"
        fields={filterFields}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      <CreateAlertModal
        isOpen={showCreateModal}
        onSubmit={handleCreateAlert}
        onCancel={() => setShowCreateModal(false)}
      />

      <DeleteAlertModal
        isOpen={alertToDelete !== null}
        alertId={alertToDelete || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {loading ? (
        <LoadingSpinner size="large" fullPage />
      ) : (
        <div className="mt-6">
          <GenericTable
            data={alerts}
            columns={tableColumns}
            actions={tableActions}
            emptyState={{
              icon: <Bell className="w-8 h-8 text-blue-600" />,
              title: "No hay alertas disponibles",
              description:
                "Las alertas aparecerán aquí cuando estén disponibles",
            }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default AlertSettingsPage;
