import type { HealthRecord } from "../types/healthHistory.types";
import { Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getGlucoseRangeColors } from "../../../shared/utils/colorUtils";

type Props = {
  records: HealthRecord[];
};

const RecentGlucoseRecords = ({ records }: Props) => {
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString("es-ES", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="text-blue-600 mr-3" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">
            Registros Recientes
          </h2>
        </div>
        <Link
          to="/History"
          className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors group"
        >
          <span>Ver historial</span>
          <ArrowRight
            size={16}
            className="ml-1 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="space-y-3">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div
              key={record.id}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-800">
                    {formatTime(record.timestamp)}
                  </p>
                  {index === 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      Más reciente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Device: {record.device_id.slice(0, 8)}...
                </p>
              </div>
              <div className="ml-4 text-right">
                {(() => {
                  const colors = getGlucoseRangeColors(record.level);
                  return (
                    <>
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-semibold border border-gray-200 ${colors.text} ${colors.background}`}
                      >
                        {record.level} mg/dL
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {colors.label}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Activity className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg">
              No hay registros disponibles
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Los registros aparecerán aquí cuando estén disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentGlucoseRecords;
