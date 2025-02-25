import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useSecureAxios from "../hooks/useSecureAxios";

const UserTransaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useSecureAxios();
  const user = location.state?.user;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.mobileNumber) return;

    const fetchTransactions = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/user-transaction/${user.mobileNumber}`
        );
        setTransactions(data.transactions);
      } catch {
        setError("Failed to fetch transactions");
        toast.error("Error loading transactions!");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user?.mobileNumber, axiosSecure]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md overflow-y-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
        >
          ⬅ Back
        </button>

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              User Transaction Details
            </h2>

            {/* User Info */}
            <div className="bg-blue-100 p-4 rounded-md mb-4">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Mobile:</strong> {user?.mobileNumber}
              </p>
              <p>
                <strong>Account Type:</strong> {user?.role}
              </p>
            </div>

            {/* Transactions Table */}
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-md">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="py-2 px-4 text-left">Transaction ID</th>
                      <th className="py-2 px-4 text-left">Amount</th>
                      <th className="py-2 px-4 text-left">Time</th>
                      <th className="py-2 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx._id} className="border-b">
                        <td className="py-2 px-4">{tx.transaction}</td>
                        <td className="py-2 px-4 text-green-600">
                          ৳{tx.totalAmount}
                        </td>
                        <td className="py-2 px-4">
                          {tx?.timestamp.split("T")[0]}
                        </td>
                        <td className="py-2 px-4">{tx.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No transactions found.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserTransaction;
