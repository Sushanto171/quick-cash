/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const CashInModal = ({ receiver, amount, refetch, selectedRole }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useSecureAxios();

  const [sendData, setSendData] = useState({
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
      setSendData({
        name: user?.name,
        mobileNumber: user?.mobileNumber,
        accountType: user?.role,
        receiverName: receiver?.name,
        receiverMobileNumber: receiver?.mobileNumber || "",
        receiverAccountType: receiver?.role,
      });
    }
  }, [receiver, user]);

  const handleTransaction = async () => {
    const { totalAmount } = sendData;
    if (!totalAmount || totalAmount < 50) {
      toast.error("Minimum amount is 50 BDT!");
      return;
    }

    try {
      setLoading(true);
      const transactionFee = totalAmount > 100 ? 5 : 0;
      const transactionData = {
        ...sendData,
        status: "unsent",
        transaction:
          Date.now().toString() + Math.random().toString().slice(2, 5),
        sendMoneyFee: transactionFee,
        finalAmount: transactionFee + totalAmount,
        totalAmount,
        timestamp: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post(
        `/transaction/${user?.email}`,
        transactionData
      );

      toast.success(
        `Transaction cash out successful! 
        Amount: $${data.totalAmount}, 
        Fee: $${data.sendMoneyFee}, 
        ID: ${data.transaction}`,
        { position: "top-right", duration: 5000 }
      );
      refetch();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      document.getElementById("transactionModal").close();
    }
  };

  // handle modal
  const handleModal = async () => {
    if (!amount || amount < 50) {
      toast.error("Cannot proceed. Minimum amount is 50 BDT.");
      return;
    }
    document.getElementById("transactionModal").showModal();
  };
  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleModal}
        className={`
         
             bg-blue-400 hover:bg-blue-600
         text-white p-4 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 `}
        disabled={!receiver || selectedRole === "user"}
      >
        Cash In
      </button>

      {/* Modal */}
      <dialog id="transactionModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Cash In</h3>

          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <label className="block text-gray-700 font-medium mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              name="amount"
              value={sendData.totalAmount || ""}
              onChange={(e) =>
                setSendData({
                  ...sendData,
                  totalAmount: e.target.value,
                })
              }
              placeholder="Minimum 50 BDT"
            />
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Name:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              readOnly
              value={sendData.receiverName || ""}
            />
          </fieldset>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-outline"
              onClick={() =>
                document.getElementById("transactionModal").close()
              }
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleTransaction}
              disabled={sendData.totalAmount < 50}
            >
              {loading ? "..." : ""} Cash Out
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CashInModal;
