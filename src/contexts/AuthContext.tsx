
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const isLoggedIn = loggedInStatus === "true";
    setIsAuthenticated(isLoggedIn);

    // If user is logged in and currently on login page, redirect to dashboard
    if (isLoggedIn && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  const login = (token: string) => {
    if (token) {
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
