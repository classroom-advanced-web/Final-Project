import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    if (context != null && localStorage.getItem("access-token")) {
      context.loadUser();
    }
  }, []);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
