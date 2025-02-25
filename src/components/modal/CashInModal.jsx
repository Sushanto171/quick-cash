/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const CashInModal = ({ sender, amount, refetch }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useSecureAxios();

  const [cashInData, setCashInData] = useState({
    receiverName: user?.name || "",
    receiverMobileNumber: user?.mobileNumber || "",
    receiverAccountType: user?.role || "",
    name: sender?.name || "",
    mobileNumber: sender?.mobileNumber || "",
    accountType: sender?.role || "",
    totalAmount: "",
    pin: "",
  });

  useEffect(() => {
    if (sender || user) {
      setCashInData((prevData) => ({
        ...prevData,
        receiverName: user?.name,
        receiverMobileNumber: user?.mobileNumber,
        receiverAccountType: user?.role,
        name: sender?.name || "",
        mobileNumber: sender?.mobileNumber || "",
        accountType: sender?.role || "",
      }));
    }
  }, [sender, user]);

  const handleTransaction = async () => {
    const totalAmount = +cashInData?.totalAmount;
    if (!totalAmount) {
      toast.error("Invalid type");
      return;
    }
    if (!amount || amount < totalAmount) {
      toast.error("Account is low");
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
        `Transaction successful!
        Amount: ${data?.data?.totalAmount} BDT,
        Fee: ${data?.data?.cost} BDT,
        ID: ${data?.data?.transactionId}`,
        { position: "top-right", duration: 5000 }
      );
      setCashInData({
        receiverName: user?.name || "",
        receiverMobileNumber: user?.mobileNumber || "",
        receiverAccountType: user?.role || "",
        name: sender?.name || "",
        mobileNumber: sender?.mobileNumber || "",
        accountType: sender?.role || "",
        totalAmount: "",
        pin: "",
      });
      refetch();
      document.getElementById("cashInModal").close();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => {
    if (!amount || amount < 50) {
      toast.error("Cannot proceed. Minimum 50 BDT required.");
      return;
    }
    document.getElementById("cashInModal").showModal();
  };

  return (
    <div>
      <button
        onClick={handleModal}
        disabled={!sender}
        title={`${!sender ? "Select a user" : ""}`}
        className="bg-blue-400 hover:bg-blue-600 text-white p-4 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        Cash In for User
      </button>

      <dialog id="cashInModal" className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-semibold mb-4">Cash In</h2>

          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Name:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              readOnly
              value={cashInData.name || ""}
            />

            <label className="block text-gray-700 font-medium mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={cashInData.totalAmount}
              onChange={(e) =>
                setCashInData((prevData) => ({
                  ...prevData,
                  totalAmount: e.target.value,
                }))
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
              value={cashInData.pin}
              onChange={(e) =>
                setCashInData((prevData) => ({
                  ...prevData,
                  pin: e.target.value,
                }))
              }
              placeholder="Enter Your 5 Digit Pin"
            />
          </fieldset>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("cashInModal").close()}
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleTransaction}
              disabled={!cashInData.pin || loading}
            >
              {loading ? "Processing..." : "Cash In"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CashInModal;
