import type { HealthRecord } from "../types/healthHistory.types";

type Props = {
  records: HealthRecord[];
};

const HealthHistoryTable = ({ records }: Props) => {
  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200">
      <table className="min-w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Glucose (mg/dL)</th>
            <th className="px-4 py-2">Pressure</th>
            <th className="px-4 py-2">Weight (kg)</th>
            <th className="px-4 py-2">BMI</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-2">{r.date}</td>
              <td className="px-4 py-2">{r.time}</td>
              <td className="px-4 py-2">{r.glucose}</td>
              <td className="px-4 py-2">{r.pressure}</td>
              <td className="px-4 py-2">{r.weight}</td>
              <td className="px-4 py-2">{r.bmi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthHistoryTable;
