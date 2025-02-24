import BalanceCard from "./homeShare/BalanceCard";
import TransactionHistory from "./homeShare/TransactionHistory";
import UserManagement from "./homeShare/UserManagement";

const AdminHome = () => {
  const balance = 10000; // Example admin balance
  const transactions = [
    { description: "Approved User1", amount: 0, type: "income" },
    { description: "Blocked User2", amount: 0, type: "expense" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <BalanceCard balance={balance} />
        <UserManagement />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default AdminHome;
