type ToggleSwitchProps = {
  enabled: boolean;
  onToggle: () => void;
};

const ToggleSwitch = ({ enabled, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors duration-300
        ${enabled ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <span
        className={`inline-block w-5 h-5 rounded-full bg-white transform transition-transform duration-300
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
};

export default ToggleSwitch;
