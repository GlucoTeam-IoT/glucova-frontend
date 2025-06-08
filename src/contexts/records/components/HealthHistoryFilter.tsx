import { useState } from "react";

type FilterProps = {
  onFilter: (
    // fromDate: string,
    // toDate: string,
    // level: string,
    limit: number
  ) => void;
};

const HealthHistoryFilters = ({ onFilter }: FilterProps) => {
  // const [fromDate, setFromDate] = useState("");
  // const [toDate, setToDate] = useState("");
  // const [level, setLevel] = useState("all");
  const [limit, setLimit] = useState(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(limit);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div>
          <label
            htmlFor="fromDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Desde
          </label>
          <input
            type="date"
            id="fromDate"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="toDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hasta
          </label>
          <input
            type="date"
            id="toDate"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
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
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="0">Normal</option>
            <option value="1">Atención</option>
            <option value="2">Alerta</option>
          </select>
        </div> */}

        <div className="max-w-60">
          <label
            htmlFor="limit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Registros a mostrar
          </label>
          <select
            id="limit"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Aplicar filtros
          </button>
        </div>
      </div>
    </form>
  );
};

export default HealthHistoryFilters;
