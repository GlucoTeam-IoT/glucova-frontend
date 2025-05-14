import { useEffect, useState } from "react";
import { getAlertSettings } from "../services/alertSettingsService";
import type { AlertSetting } from "../types/alertSettings.types";

const AlertSettingsForm = () => {
  const [settings, setSettings] = useState<AlertSetting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAlertSettings();
      setSettings(data);
    };
    fetchData();
  }, []);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id
          ? { ...setting, isActive: !setting.isActive }
          : setting
      )
    );
  };

  return (
    <div className="space-y-6">
      {settings.map((setting) => (
        <section key={setting.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">{setting.title}</h3>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={setting.isActive}
              onChange={() => toggleSetting(setting.id)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {setting.threshold !== undefined && (
              <div>
                <label className="text-sm text-gray-600">Threshold (mg/dL)</label>
                <input
                  type="number"
                  value={setting.threshold}
                  readOnly
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
            )}

            {setting.timeWithoutReading && (
              <div>
                <label className="text-sm text-gray-600">Time Without Reading</label>
                <input
                  type="text"
                  value={setting.timeWithoutReading}
                  readOnly
                  className="w-full mt-1 border rounded px-3 py-2"
                />
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600">Notification Frequency</label>
              <select
                value={setting.frequency}
                disabled
                className="w-full mt-1 border rounded px-3 py-2"
              >
                <option>Every Reading</option>
                <option>Once a Day</option>
                <option>Never</option>
              </select>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AlertSettingsForm;
