import useUserTransactions from "../../../hooks/useUserTransactions";
import LoadingSpinner from "../../share/LoadingSpinner";

const UserAgentTransaction = () => {
  const { transactions, isLoading, error } = useUserTransactions();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (transactions.length === 0)
    return (
      <div>
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <p className="text-center text-gray-500">No transactions found.</p>
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-md shadow-md overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300 ">
        <thead className=" ">
          <tr>
            <th className="border px-4 py-2">Transaction Id</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Amount (TK)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="text-center">
              <td className="border px-4 py-2">
                {transaction.transaction || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {new Date(transaction.timestamp).toLocaleDateString()} at
                {new Date(transaction.timestamp).toLocaleTimeString()}
              </td>
              <td className="border px-4 py-2">{transaction?.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAgentTransaction;
