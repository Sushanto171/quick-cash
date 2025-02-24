import BalanceCard from "./homeShare/BalanceCard";
import TransactionActions from "./homeShare/TransactionActions";
import TransactionHistory from "./homeShare/TransactionHistory";

const AgentHome = () => {
  const balance = 5000; // Example agent balance
  const transactions = [
    { description: "Cash Out to User1", amount: -2000, type: "expense" },
    { description: "Cash In from User2", amount: 3000, type: "income" },
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

export default AgentHome;
