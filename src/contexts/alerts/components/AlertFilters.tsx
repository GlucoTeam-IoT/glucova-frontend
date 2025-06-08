import { useState, useEffect } from "react";
import type { AlertsFilter } from "../types/alertSettings.types";
import { getDevices } from "../../devices/services/devicesService";
import type { Device } from "../../devices/types/devices.types";

type Props = {
  onFilterChange: (filters: AlertsFilter) => void;
};

const AlertFilters = ({ onFilterChange }: Props) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filters, setFilters] = useState<AlertsFilter>({
    device_id: null,
    level: null,
    limit: 100,
  });

  useEffect(() => {
    const loadDevices = async () => {
      const devicesList = await getDevices();
      setDevices(devicesList);
    };
    loadDevices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = {
      ...filters,
      [name]: value === "" ? null : value,
    };

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-800 mb-3">
        Filtrar alertas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="device_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dispositivo
          </label>
          <select
            id="device_id"
            name="device_id"
            value={filters.device_id || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los dispositivos</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.id.substring(0, 8)}...
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nivel
          </label>
          <select
            id="level"
            name="level"
            value={filters.level || ""}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los niveles</option>
            <option value="low">Bajo</option>
            <option value="medium">Medio</option>
            <option value="high">Alto</option>
            <option value="critical">Crítico</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mostrar
          </label>
          <select
            id="limit"
            name="limit"
            value={filters.limit || 100}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={10}>10 alertas</option>
            <option value={25}>25 alertas</option>
            <option value={50}>50 alertas</option>
            <option value={100}>100 alertas</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AlertFilters;
