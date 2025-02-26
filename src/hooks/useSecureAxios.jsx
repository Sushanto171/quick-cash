import axios from "axios";
import toast from "react-hot-toast";
import { useFingerprint } from "../utilies";
//  Axios instance with interceptors
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const useSecureAxios = () => {
  const deviceId = useFingerprint();
  //   get token
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };
  // Interceptor for adding auth token to each request
  axiosSecure.interceptors.request.use(
    async (config) => {
      const token = getAuthToken();

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      if (deviceId) config.headers["x-device-id"] = deviceId;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor res errors globally
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const status = error.response.status;
        // Handle specific HTTP errors (e.g., 401 for unauthorized)
        if (status === 401 || status === 403) {
          // Optionally, log out the user or redirect to the login page
          toast.error("Unauthorized - token expired or invalid");
          localStorage.removeItem("token");
        }
      } else {
        toast.error("Network error or API is down");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useSecureAxios;
