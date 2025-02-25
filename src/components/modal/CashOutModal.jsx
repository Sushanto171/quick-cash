/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSecureAxios from "../../hooks/useSecureAxios";

const CashOutModal = ({ receiver, amount, refetch, selectedRole }) => {
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
    pin: "",
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
    const totalAmount = +sendData?.totalAmount;
    if (amount < 0) {
      toast.error("Your account is low");
      return;
    }
    if (amount < totalAmount) {
      toast.error("Your account is low");
      return;
    }
    if (!totalAmount) {
      toast.error("Invalid type");
      return;
    }
    if (!sendData.pin?.length === 5 || !sendData.pin) {
      toast.error("Invalid type");
      return;
    }

    try {
      setLoading(true);
      const transactionFee = ((+totalAmount * 1.5) / 100).toFixed(2);
      const cashOutData = {
        ...sendData,
        status: "unsent",
        transaction:
          Date.now().toString() + Math.random().toString().slice(2, 5),
        sendMoneyFee: +transactionFee,
        finalAmount: +(+transactionFee + totalAmount).toFixed(),
        totalAmount,
        timestamp: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post(
        `/cash-out/${user?.email}`,
        cashOutData
      );
      console.log(data.data);
      toast.success(
        `Transaction cash out successful!
        Amount: $${data?.data?.totalAmount},
        Fee: $${data?.data?.cost},
        ID: ${data?.data?.transactionId}`,
        { position: "top-right", duration: 5000 }
      );
      setSendData({
        name: user?.name || "",
        mobileNumber: user?.mobileNumber || 0,
        accountType: user?.role || "",
        receiverName: receiver?.name || "",
        receiverMobileNumber: receiver?.mobileNumber || 0,
        receiverAccountType: receiver?.role,
        totalAmount: 0,
        pin: "",
      });
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
    document.getElementById("transactionModal").showModal();
  };
  return (
    <div>
      {/* Open Modal Button */}
      <button
        onClick={handleModal}
        className={`
         
             bg-yellow-400 hover:bg-yellow-600
         text-white p-4 w-full rounded-lg shadow-md disabled:cursor-not-allowed disabled:bg-gray-500 `}
        disabled={!receiver || selectedRole === "user"}
      >
        Cash Out
      </button>

      {/* Modal */}
      <dialog id="transactionModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-4">Cash Out</h3>

          <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
            <label className="block text-gray-700 font-medium mb-1">
              Receiver Name:
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              name="name"
              required
              readOnly
              value={sendData.receiverName || ""}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Enter Amount
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              name="totalAmount"
              required
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
              Enter Pin
            </label>
            <input
              type="password"
              maxLength={5}
              required
              className="input input-bordered w-full"
              name="pin"
              value={sendData.pin || ""}
              onChange={(e) =>
                setSendData({
                  ...sendData,
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
              onClick={() =>
                document.getElementById("transactionModal").close()
              }
            >
              Close
            </button>
            <button
              className="btn btn-success"
              onClick={handleTransaction}
              disabled={!sendData.pin && !sendData.amount}
            >
              {loading ? "..." : ""} Cash Out
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CashOutModal;
