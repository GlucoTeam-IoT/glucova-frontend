import { useState } from "react";

type Props = {
  onFilter: (dateFrom: string, dateTo: string, type: string) => void;
};

const HealthHistoryFilters = ({ onFilter }: Props) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [type, setType] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(dateFrom, dateTo, type);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-end"
    >
      <div>
        <label className="block text-sm font-medium text-gray-600">Desde</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Hasta</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Tipo</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
        >
          <option value="all">Todos</option>
          <option value="glucose">Glucosa</option>
          <option value="pressure">Presión</option>
          <option value="weight">Peso</option>
          <option value="bmi">BMI</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Aplicar filtros
      </button>
    </form>
  );
};

export default HealthHistoryFilters;
