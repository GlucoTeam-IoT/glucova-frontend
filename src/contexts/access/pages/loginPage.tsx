import { LoginForm } from "../components/loginForm";
import { motion } from "motion/react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="w-full md:w-[402px] md:h-[478px] bg-white p-10 rounded-2xl shadow-2xl flex flex-col"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mb-6 text-center flex-shrink-0">
          <img src="/Glucova.png" alt="GlucoVA" className="mx-auto h-12" />
          <h1 className="text-2xl font-semibold text-blue-900 mt-4">
            Bienvenido a GlucoVA
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
