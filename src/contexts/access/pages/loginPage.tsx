import { LoginForm } from "../components/loginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <div className="mb-6 text-center">
          <img
            src="/logo.svg" // Cambia a tu logo real o usa un placeholder
            alt="GlucoVA"
            className="mx-auto h-16 w-auto"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Iniciar Sesión</h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
