import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAllUsersData from "../../hooks/useAllUsersData";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import LoadingSpinner from "../share/LoadingSpinner";
import BalanceCard from "./homeShare/BalanceCard";
import TransactionHistory from "./homeShare/TransactionHistory";
import UserManagement from "./homeShare/UserManagement";

const AdminHome = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useSecureAxios();
  const { allUser, isLoading: userLoading, refetch } = useAllUsersData();
  const [otherUser, setOtherUser] = useState([]);
  const [agent, setAgent] = useState([]);
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
        <UserManagement users={otherUser} refetch={refetch} />
        <TransactionHistory transactions={transactions} />
      </div>
    </div>
  );
};

export default AdminHome;
