/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUserAmount from "../../../hooks/useUserAmount";
import SendManyModal from "../../modal/SendManyModal";
import LoadingSpinner from "../../share/LoadingSpinner";

const TransactionActions = ({ allUser }) => {
  const [selectedRole, setSelectedRole] = useState("user");
  const { amount, isLoading: amountLoading } = useUserAmount();
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [otherUser, setOtherUser] = useState([]);
  const [agent, setAgent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allUser) {
      setOtherUser(allUser.filter((user) => user.role === "user") || []);
      setAgent(allUser.filter((user) => user.role === "agent") || []);
    }
  }, [allUser]);

  // Handle selection of multiple recipients
  const handleRecipientChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      JSON.parse(option.value)
    );
    setSelectedRecipients(selectedOptions);
  };

  const handleSend = async () => {
    if (!amount || amount < 50) {
      toast.error("Cannot send money. Minimum amount is 50 BDT.");
      return;
    }
    try {
      setLoading(true);
      console.log("Sending to:", selectedRecipients, "Amount:", amount);
      // user to user send many
      if (selectedRecipients[0].role === "user") {
        console.log(selectedRecipients);
      }
      toast.success("Money sent successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  if (amountLoading) return <LoadingSpinner />;
  return (
    <div className="my-4">
      {/* Transaction Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-4 rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-blue-700"
          disabled={selectedRecipients.length === 0}
        >
          Send Money
        </button>
        <button
          className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={selectedRecipients.length === 0 || selectedRole === "user"}
        >
          Cash Out
        </button>
        <button
          className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={selectedRecipients.length === 0 || selectedRole === "user"}
        >
          Cash In
        </button>
      </div>

      <div className="grid md:grid-cols-2 mt-4">
        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Select Role:
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {/* Selected Recipients Display */}
        {selectedRecipients.length > 0 && (
          <div className="px-2 bg-gray-100 rounded">
            <h3 className="font-medium pt-1 pb-1 text-gray-700">
              Selected Recipients:
            </h3>
            <ul className=" w-full appearance-none dropdown-top">
              <li className=" w-full p-2 border border-gray-300 truncate rounded-md bg-white">
                {selectedRecipients[0].name} {selectedRecipients[0].email}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Multi-User Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select Recipients:
        </label>
        <select
          className="select select-bordered w-full"
          onChange={handleRecipientChange}
        >
          {(selectedRole === "agent" ? agent : otherUser).map((user) => (
            <option key={user._id} value={JSON.stringify(user)}>
              {user.name} - {user.email}
            </option>
          ))}
        </select>
      </div>
      <SendManyModal receiver={selectedRecipients[0]} />
    </div>
  );
};

export default TransactionActions;
