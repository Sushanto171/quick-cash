import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useUserAmount from "../../hooks/useUserAmount";
import LoadingSpinner from "../share/LoadingSpinner";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import UserAgentTransaction from "./homeShare/UserAgentTransaction";

const UserHome = () => {
  const { loading, user } = useAuth();
  const { allUser, isLoading } = useAllUsersData();
  const { amount, isLoading: amountLoading } = useUserAmount();

  if (loading || isLoading || amountLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <BalanceCard balance={amount} />
        <TransactionActions allUser={allUser} />
        <UserAgentTransaction mobileNumber={user?.mobileNumber} />
      </div>
    </div>
  );
};

export default UserHome;
