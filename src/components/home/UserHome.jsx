import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useUserAmount from "../../hooks/useUserAmount";
import LoadingSpinner from "../share/LoadingSpinner";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import TransactionHistory from "./homeShare/TransactionHistory";

const UserHome = () => {
  const { loading } = useAuth();
  const { allUser, isLoading } = useAllUsersData();
  const { amount, isLoading: amountLoading } = useUserAmount();

  const transactions = [
    { description: "Sent money to User1", amount: -500, type: "expense" },
    {
      description: "Received payment from User2",
      amount: 1000,
      type: "income",
    },
  ];
  if (loading || isLoading || amountLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <BalanceCard balance={amount} />
        <TransactionActions allUser={allUser} />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default UserHome;
