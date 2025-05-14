import AlertSettingsForm from "../components/AlertSettingsForm";

const AlertSettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Alert Settings</h1>
      <AlertSettingsForm />
    </div>
  );
};

export default AlertSettingsPage;
