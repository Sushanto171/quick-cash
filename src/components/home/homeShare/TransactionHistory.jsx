/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TransactionHistory = ({ agent = [] }) => {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    if (agent.length > 0) {
      const approved = agent.filter((user) => user.approve === true);
      setAgents(approved);
    }
  }, [agent]);
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-md shadow-md overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Management</h2>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Balance (TK)</th>
            <th className="border px-4 py-2">All Transactions</th>
          </tr>
        </thead>
        <tbody>
          {agent.length > 0 ? (
            agents.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.amount}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      navigate(`/user-transaction`, { state: { user } })
                    }
                    className="btn btn-ghost bg-gray-200"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border px-4 py-2 text-center text-gray-500"
              >
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
