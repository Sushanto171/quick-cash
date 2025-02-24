/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("user");
  const axiosSecure = useSecureAxios();

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure(`/role/${user.email}`);
          setUserRole(res?.data?.role || user?.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchRole();
  }, [user]);

  console.log(userRole);
  return userRole;
};

export default useRole;
