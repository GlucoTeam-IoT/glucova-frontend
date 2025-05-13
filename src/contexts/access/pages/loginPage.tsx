import { LoginForm } from "../components/loginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-2xl">
        <div className="mb-6 text-center">
          <img
            src="/logo.svg"
            alt="GlucoVA"
            className="mx-auto h-12"
          />
          <h1 className="text-2xl font-semibold text-blue-900 mt-4">
            Welcome Back to GlucoVa
          </h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
