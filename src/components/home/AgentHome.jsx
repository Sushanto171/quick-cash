import useAgentStatus from "../../hooks/useAgentStatus";
import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useUserAmount from "../../hooks/useUserAmount";
import LoadingSpinner from "../share/LoadingSpinner";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import TransactionHistory from "./homeShare/TransactionHistory";

const AgentHome = () => {
  const { loading } = useAuth();
  const { allUser, isLoading } = useAllUsersData();
  const { amount, isLoading: amountLoading } = useUserAmount();
  const { isAgent, isLoading: agentLoading } = useAgentStatus();

  const transactions = [
    { description: "Cash Out to User1", amount: -2000, type: "expense" },
    { description: "Cash In from User2", amount: 3000, type: "income" },
  ];
  console.log(isAgent);
  if (loading || isLoading || amountLoading || agentLoading)
    return <LoadingSpinner />;
  return (
    <div className=" bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {isAgent ? (
          <>
            <BalanceCard balance={amount} />
            <TransactionActions allUser={allUser} />
            <TransactionHistory transactions={transactions} />
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
