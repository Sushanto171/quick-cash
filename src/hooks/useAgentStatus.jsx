import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useAgentStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const {
    data: isAgent,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "isAgent"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure(
          `/agent-approval-status/${user.email}`
        );

        return data?.data;
      }
    },
    enabled: !!user?.email,
  });

  return { isAgent, isError, isLoading, refetch };
};

export default useAgentStatus;
