import { useEffect, useState } from "react";
import { getAlertSettings } from "../services/alertSettingsService";
import type { AlertSetting } from "../types/alertSettings.types";
import ToggleSwitch from "./TogleSwitch";

const AlertSettingsForm = () => {
  const [settings, setSettings] = useState<AlertSetting[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getAlertSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, isActive: !setting.isActive } : setting
      )
    );
  };

const handleFrequencyChange = (id: string, newFrequency: string) => {
  setSettings((prev) =>
    prev.map((setting) =>
      setting.id === id
        ? {
            ...setting,
            frequency: newFrequency as AlertSetting["frequency"], // 🔧 cast
          }
        : setting
    )
  );
};


  return (
    <form className="space-y-4">
      {settings.map((setting) => (
        <div
          key={setting.id}
          className="bg-white p-4 rounded-md shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex-1">
            <h3 className="font-semibold">{setting.title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {setting.threshold !== undefined && (
                <div>
                  <label className="text-sm text-gray-600">Threshold (mg/dL)</label>
                  <input
                    type="number"
                    value={setting.threshold}
                    disabled
                    className="w-full mt-1 border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
              )}

              {setting.timeWithoutReading && (
                <div>
                  <label className="text-sm text-gray-600">Time Without Reading</label>
                  <input
                    type="text"
                    value={setting.timeWithoutReading}
                    disabled
                    className="w-full mt-1 border rounded px-3 py-2 bg-gray-100"
                  />
                </div>
              )}

              <div>
                <label className="text-sm text-gray-600">Notification Frequency</label>
                <select
                  value={setting.frequency}
                  disabled={!setting.isActive}
                  onChange={(e) => handleFrequencyChange(setting.id, e.target.value)}
                  className={`w-full mt-1 border rounded px-3 py-2 ${
                    !setting.isActive ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                  }`}
                >
                  <option>Every Reading</option>
                  <option>Once a Day</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </div>

          <div className="self-start md:self-auto">
         <ToggleSwitch
             enabled={setting.isActive}
             onToggle={() => toggleSetting(setting.id)}
          />

          </div>
        </div>
      ))}
    </form>
  );
};

export default AlertSettingsForm;
