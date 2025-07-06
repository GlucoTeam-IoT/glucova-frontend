import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import SessionExpiredModal from "../../shared/components/SessionExpiredModal";
import { logout, setSessionExpiredCallback } from "./services/authService";

type AuthContextType = {
  isAuthenticated: boolean;
  handleSessionExpired: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated on mount and token changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);

      // If no token and we're not on login/register pages, redirect
      if (
        !token &&
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        navigate("/login", { replace: true });
      }
    };

    checkAuth();

    // Listen for storage changes (logout in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);

  const handleSessionExpired = () => {
    setShowSessionExpiredModal(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setShowSessionExpiredModal(false);
    navigate("/login", { replace: true });
  };

  const handleModalConfirm = () => {
    handleLogout();
  };

  // Configure the session expired callback on mount
  useEffect(() => {
    setSessionExpiredCallback(handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleSessionExpired,
        handleLogout,
      }}
    >
      {children}
      <SessionExpiredModal
        isOpen={showSessionExpiredModal}
        onConfirm={handleModalConfirm}
      />
    </AuthContext.Provider>
  );
};
