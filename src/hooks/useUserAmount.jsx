import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useUserAmount = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const {
    data: amount,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "amount"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure(`/user-amount/${user.email}`);

        return parseFloat(data?.amount).toFixed(2) || 0;
      }
    },
  });

  return { amount, isLoading, isError, refetch };
};

export default useUserAmount;
