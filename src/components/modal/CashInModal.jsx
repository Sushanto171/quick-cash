/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const CashInModal = ({ sender, amount, refetch, selectedRole }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useSecureAxios();
  const [cashInData, setCashInData] = useState({
    receiverName: user?.name || "",
    receiverMobileNumber: user?.mobileNumber || 0,
    receiverAccountType: user?.role || "",
    name: sender?.name || "",
    mobileNumber: sender?.mobileNumber || 0,
    accountType: sender?.role,
    totalAmount: 0,
    pin: "",
  });
  useEffect(() => {
    if (sender || user) {
      setCashInData({
        receiverName: user?.name,
        receiverMobileNumber: user?.mobileNumber,
        receiverAccountType: user?.role,
        name: sender?.name,
        nobileNumber: sender?.mobileNumber || "",
        accountType: sender?.role,
      });
    }
  }, [sender, user]);

  const handleTransaction = async () => {
    const totalAmount = +cashInData?.totalAmount;

    if (!totalAmount) {
      toast.error("Invalid type");
      return;
    }

    try {
      setLoading(true);
      const cashIn = {
        ...cashInData,
        status: "unsent",
        transaction:
          Date.now().toString() + Math.random().toString().slice(2, 5),
        finalAmount: 0,
        totalAmount,
        timestamp: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post(
        `/cash-in/${user?.email}`,
        cashIn
      );
      console.log(data);
      toast.success(
        `Transaction cash out successful!
        Amount: $${data?.data?.totalAmount},
        Fee: $${data?.data?.sendMoneyFee},
        ID: ${data?.data?.transaction}`,
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
    if (!amount || amount < 0) {
      toast.error("Cannot proceed. Account is low!.");
      return;
    }
    document.getElementById("cashInModal").showModal();
  };
  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleModal}
        className={`
         
             bg-blue-400 hover:bg-blue-600
         text-white p-4 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 `}
      >
        Cash In for user
      </button>

      {/* Modal */}
      <dialog id="cashInModal" className="modal">
        <div className="modal-box">
          Cash In
          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Name:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              readOnly
              value={cashInData.name || ""}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              name="amount"
              value={cashInData.totalAmount || ""}
              onChange={(e) =>
                setCashInData({
                  ...cashInData,
                  totalAmount: e.target.value,
                })
              }
              placeholder="Minimum 50 BDT"
            />
            <label className="block text-gray-700 font-medium mb-1">
              Enter Pin
            </label>
            <input
              type="password"
              maxLength={5}
              className="input input-bordered w-full"
              name="pin"
              value={cashInData.pin || ""}
              onChange={(e) =>
                setCashInData({
                  ...cashInData,
                  pin: e.target.value,
                })
              }
              placeholder="Enter Your 5 Digit Pin"
            />
          </fieldset>
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("cashInModal").close()}
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleTransaction}
              disabled={!cashInData.pin}
            >
              {loading ? "..." : ""} Cash In
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CashInModal;
