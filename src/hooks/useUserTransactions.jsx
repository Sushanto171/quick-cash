import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import useSecureAxios from "./useSecureAxios";

const useUserTransactions = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userTransactions", user?.mobileNumber],
    queryFn: async () => {
      if (!user?.mobileNumber) return [];
      try {
        const { data } = await axiosSecure.get(
          `/user-transaction/${user?.mobileNumber}?limit=100`
        );
        return data.transactions;
      } catch {
        toast.error("Error loading transactions!");
        throw new Error("Failed to fetch transactions");
      }
    },
    enabled: !!user?.mobileNumber,
  });

  return { transactions: data || [], isLoading, error, refetch };
};

export default useUserTransactions;
