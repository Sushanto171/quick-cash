/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useAxiosInstance from "../hooks/useAxiosInstance";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");

  //   if (savedToken) {
  //     setToken(savedToken);
  //     axiosInstance("/auth/me", {
  //       headers: { Authorization: `Bearer ${savedToken}` },
  //     })
  //       .then((res) => {
  //         setUser(res.data.user);
  //       })
  //       .catch(() => {
  //         setUser(null);
  //         localStorage.removeItem("token");
  //       })
  //       .finally(() => setLoading(false));
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const authInfo = { user, setUser, loading, logout, setToken, token };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
