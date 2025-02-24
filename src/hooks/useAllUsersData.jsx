import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useAllUsersData = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const {
    data: allUser = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "allUser"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure(`/users`);
        return data?.data;
      }
    },
  });

  return { allUser, isLoading, isError, refetch };
};

export default useAllUsersData;
