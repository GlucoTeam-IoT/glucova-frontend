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
import AlertsTable from "../components/AlertsTable";
import AlertFilters from "../components/AlertFilters";
import DeleteAlertModal from "../components/DeleteAlertModal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { Plus } from "lucide-react";

import CreateAlertModal from "../components/CreateAlertModal";

const AlertSettingsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AlertsFilter>({
    limit: 100,
    skip: 0,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertToDelete, setAlertToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAlerts();
  }, [filters]);

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

  const handleDeleteClick = (alertId: string) => {
    setAlertToDelete(alertId);
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

  const handleFilterChange = (newFilters: AlertsFilter) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <>
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

      <AlertFilters onFilterChange={handleFilterChange} />

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
        <div className="mt-6 ">
          <AlertsTable alerts={alerts} onDelete={handleDeleteClick} />
        </div>
      )}
    </>
  );
};

export default AlertSettingsPage;
