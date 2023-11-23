/* eslint-disable @typescript-eslint/no-unused-vars */
import authApi from "@/api/authApi";
import { createContext, useState } from "react";

type AuthContext = {
  user: User | null,
  loading: boolean,
  error: string,
  login: ({email, password} : {email: string, password:string}) => Promise<void>,
  register: (registerInstance: RegisterDTO) => Promise<void>,
  logout: () => void,
  loadUser: () => Promise<void>,
}

export const AuthContext = createContext<AuthContext | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUser = async () => {
    try {
      const res = await authApi.loadUser();

      if (res) {
        const { id, email, dob, first_name, last_name, gender } = res;
        const user = {
          id,
          email,
          dob: dob ? new Date(dob) : new Date("1/1/2000"),
          firstName: first_name ?? "",
          lastName: last_name ?? "",
          gender: gender,
        };

        setUser(user);
      }
    } catch (error: any) {
      localStorage.removeItem("access-token");
      setUser(null);
      console.error(error);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const res = await authApi.login({ email, password });

      if (res?.access_token) {
        localStorage.setItem("access-token", res.access_token);
        localStorage.setItem("refresh-token", res.refresh_token);
        loadUser();
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    setUser(null);
  };

  const register = async (registerInstance: RegisterDTO) => {
    setLoading(true);
    try {
      const res = await authApi.register(registerInstance);
      if (res?.access_token) {
        localStorage.setItem("access-token", res.access_token);
        localStorage.setItem("refresh-token", res.refresh_token);
        loadUser();
      }
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const data = {
    user,
    loading,
    error,
    login,
    loadUser,
    logout,
    register,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
