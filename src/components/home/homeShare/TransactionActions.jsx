/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserAmount from "../../../hooks/useUserAmount";
import CashInModal from "../../modal/CashInModal";
import SendManeyModal from "../../modal/SendManyModal";
import LoadingSpinner from "../../share/LoadingSpinner";
import useRole from "./../../../hooks/useRole";
import CashOutModal from "./../../modal/CashOutModal";

const TransactionActions = ({ allUser }) => {
  const [selectedRole, setSelectedRole] = useState("user");
  const { user } = useAuth();
  const userRole = useRole();
  const { amount, isLoading: amountLoading, refetch } = useUserAmount();
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [otherUser, setOtherUser] = useState([]);
  const [agent, setAgent] = useState([]);

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

  // Handle selection of multiple recipients
  const handleRecipientChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      JSON.parse(option.value)
    );
    setSelectedRecipients(selectedOptions);
  };

  if (amountLoading) return <LoadingSpinner />;

  return (
    <div className="my-4">
      {/* Transaction Buttons */}
      <div className="grid grid-cols-3 gap-4">
        {/* user to user send money modal */}
        {userRole === "user" && (
          <SendManeyModal
            amount={amount}
            selectedRole={selectedRole}
            refetch={refetch}
            receiver={selectedRecipients[0]}
          />
        )}
        {/* user to agent cash out */}
        {userRole === "user" && (
          <CashOutModal
            receiver={selectedRecipients[0]}
            amount={amount}
            selectedRole={selectedRole}
            refetch={refetch}
          />
        )}
        {/* agent to user cash in */}
        {userRole === "agent" && (
          <CashInModal
            sender={selectedRecipients[0]}
            amount={amount}
            selectedRole={selectedRole}
            refetch={refetch}
          />
        )}
      </div>

      {userRole === "user" && (
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
                  {selectedRecipients[0].name} (
                  {selectedRecipients[0].mobileNumber})
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Multi-User Selection */}
      <div className="mb-4 mt-4">
        <label className="block text-gray-700 font-medium mb-2">
          Select {userRole === "user" ? "Recipients" : "Users"}:
        </label>
        <select
          className="select select-bordered w-full"
          onChange={handleRecipientChange}
        >
          {userRole === "user"
            ? (selectedRole === "agent" ? agent : otherUser).map((user) => (
                <option key={user._id} value={JSON.stringify(user)}>
                  {user.name} - ({user.mobileNumber})
                </option>
              ))
            : otherUser.map((user) => {
                return (
                  <option key={user._id} value={JSON.stringify(user)}>
                    {user.name} - ({user.mobileNumber})
                  </option>
                );
              })}
        </select>
      </div>
    </div>
  );
};

export default TransactionActions;
