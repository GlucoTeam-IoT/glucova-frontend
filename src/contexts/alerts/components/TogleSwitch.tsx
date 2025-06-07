type ToggleSwitchProps = {
  enabled: boolean;
  onToggle: () => void;
};

const ToggleSwitch = ({ enabled, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span className="sr-only">{enabled ? "Enable" : "Disable"} setting</span>
      <span
        className={`absolute h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
