import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAgentStatus from "../../hooks/useAgentStatus";
import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import LoadingSpinner from "../share/LoadingSpinner";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import UserAgentTransaction from "./homeShare/UserAgentTransaction";

const AgentHome = () => {
  const { loading, user } = useAuth();
  const { allUser, isLoading } = useAllUsersData();
  const axiosSecure = useSecureAxios();
  const { isAgent, isLoading: agentLoading } = useAgentStatus();

  const {
    data: agentTransaction = {},
    isLoading: transactionLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "agent", isAgent],
    queryFn: async () => {
      if (user?.email) {
        const mobileNumber = user?.mobileNumber;
        const { data } = await axiosSecure(
          `/agent/transactions/${mobileNumber}`
        );

        return data?.transactions[0] || [];
      }
    },
    enabled: !!user?.email && isAgent,
  });

  if (isError) {
    toast.error(error.message);
    return;
  }
  if (loading || isLoading || agentLoading || transactionLoading)
    return <LoadingSpinner />;
  return (
    <div className="  ">
      <div className="max-w-4xl mx-auto p-6">
        {isAgent ? (
          <>
            <BalanceCard balance={agentTransaction?.totalAmountProcessed} />
            <TransactionActions
              refresh={refetch}
              agentAmount={agentTransaction?.totalAmountProcessed}
              allUser={allUser}
            />
            <UserAgentTransaction />
          </>
        ) : (
          <>
            <h1>Under review ...... to admin approval</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AgentHome;
