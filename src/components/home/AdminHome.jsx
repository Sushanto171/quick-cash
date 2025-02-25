import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import LoadingSpinner from "../share/LoadingSpinner";
import AgentApproval from "./homeShare/AgentApproval";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionHistory from "./homeShare/TransactionHistory";
import UserManagement from "./homeShare/UserManagement";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useSecureAxios();
  const { allUser, isLoading: userLoading, refetch } = useAllUsersData();
  const [otherUser, setOtherUser] = useState([]);
  const [agent, setAgent] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["User Management", "Agent Approval", "Transaction History"];
  const {
    data: adminTransaction = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [user?.email, "admin"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure(
          `/admin/transactions/${user?.email}`
        );

        return data?.transactions[0];
      }
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (allUser) {
      setOtherUser(
        allUser.filter((u) => u.role === "user" && u.email !== user?.email) ||
          []
      );
      setAgent(
        allUser.filter((u) => u.role === "agent" && u.email !== user?.email) ||
          []
      );
    }
  }, [allUser, user]);

  console.log(allUser);
  const balance = 10000;
  const transactions = [
    { description: "Approved User1", amount: 0, type: "income" },
    { description: "Blocked User2", amount: 0, type: "expense" },
  ];

  console.log(adminTransaction);
  if (isError) {
    toast.error(error.message);
  }
  if (loading || isLoading || userLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <BalanceCard balance={balance} />
        {/* Tabs */}
        <div className="flex border-b-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-lg font-semibold ${
                activeTab === index
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 0 && (
            <UserManagement users={otherUser} refetch={refetch} />
          )}
          {activeTab === 1 && (
            <AgentApproval agents={agent} refetch={refetch} />
          )}
          {activeTab === 2 && (
            <TransactionHistory transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
