/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";
import useUserTransactions from "../../hooks/useUserTransactions";

const SendManeyModal = ({ receiver, amount, refetch, selectedRole }) => {
  const { refetch: userRE } = useUserTransactions();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useSecureAxios();

  const [sendManyData, setSendManyData] = useState({
    name: user?.name || "",
    mobileNumber: user?.mobileNumber || 0,
    accountType: user?.role || "",
    receiverName: receiver?.name || "",
    receiverMobileNumber: receiver?.mobileNumber || 0,
    receiverAccountType: receiver?.role,
    totalAmount: 0,
  });

  useEffect(() => {
    if (receiver || user) {
      setSendManyData({
        name: user?.name,
        mobileNumber: user?.mobileNumber,
        accountType: user?.role,
        receiverName: receiver?.name,
        receiverMobileNumber: receiver?.mobileNumber || "",
        receiverAccountType: receiver?.role,
      });
    }
  }, [receiver, user]);

  const handleSend = async () => {
    const { totalAmount } = sendManyData;
    if (!totalAmount || totalAmount < 50) {
      toast.error("Minimum send amount is 50 BDT!");
      return;
    }

    // Ensure you select the recipients and pass the amount
    if (!receiver) {
      toast.error("Please select at least one recipient!");
      return;
    }
    if (!user) {
      toast.error("Sender is unbailable!");
      return;
    }
    try {
      setLoading(true);
      const sendMoneyFee = +sendManyData.totalAmount > 100 ? 5 : 0;
      const sendData = {
        ...sendManyData,
        status: "unsent",
        transaction:
          Date.now().toString() + Math.random().toString().slice(2, 5),
        sendMoneyFee,
        finalAmount: sendMoneyFee + +totalAmount,
        totalAmount: +sendManyData.totalAmount,
        timestamp: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post(
        `/send-maney/${user?.email}`,
        sendData
      );

      toast.success(
        ` Transaction Successful! 
        Amount: $${data?.data?.totalAmount}, 
        Fee: $${data?.data?.cost}, 
        ID: ${data?.data?.transaction}`,
        { position: "top-right", duration: 5000 }
      );
      refetch();
      userRE();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      document.getElementById("sendManyModal").close();
    }
  };

  // handle modal
  const handleModal = async () => {
    if (!amount || amount < 50) {
      toast.error("Cannot send money. Minimum amount is 50 BDT.");
      return;
    }
    document.getElementById("sendManyModal").showModal();
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleModal}
        className="bg-blue-500 text-white p-4 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-blue-700"
        disabled={!receiver || selectedRole === "agent"}
      >
        Send Money
      </button>

      {/* Modal */}
      <dialog id="sendManyModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Send Money</h3>

          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <label className="block text-gray-700 font-medium mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              name="amount"
              value={sendManyData.totalAmount || ""}
              onChange={(e) =>
                setSendManyData({
                  ...sendManyData,
                  totalAmount: e.target.value,
                })
              }
              placeholder="Minimum 50 BDT"
            />
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Number:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              readOnly
              value={sendManyData.mobileNumber || ""}
            />
          </fieldset>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("sendManyModal").close()}
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleSend}
              disabled={sendManyData.totalAmount < 50}
            >
              {loading ? "..." : ""} Send Money
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SendManeyModal;
