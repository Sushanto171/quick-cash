import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import TransactionHistory from "./homeShare/TransactionHistory";

const UserHome = () => {
  const balance = 1500; // Example user balance
  const transactions = [
    { description: "Sent money to User1", amount: -500, type: "expense" },
    {
      description: "Received payment from User2",
      amount: 1000,
      type: "income",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <BalanceCard balance={balance} />
        <TransactionActions />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default UserHome;
