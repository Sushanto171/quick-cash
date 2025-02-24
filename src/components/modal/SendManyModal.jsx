/* eslint-disable react/prop-types */
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const SendManyModal = ({ receiver }) => {
  const { user } = useAuth();

  const [sendManyData, setSendManyData] = useState({
    name: user?.name,
    email: user?.email,
    mobileNumber: user?.mobileNumber,
    accountType: user?.role,
    receiverName: receiver?.name,
    receiverEmail: receiver?.email,
    receiverMobileNumber: receiver?.mobileNumber,
    receiverAccountType: receiver?.role,
    totalAmount: 0,
    status: "unsent",
    transaction: "",
  });

  const handleSend = async () => {
    const { totalAmount } = sendManyData;
    if (!totalAmount || totalAmount < 50) {
      alert("Minimum send amount is 50 BDT!");
      return;
    }

    // Ensure you select the recipients and pass the amount
    if (!receiver) {
      alert("Please select at least one recipient!");
      return;
    }

    try {
      console.log(sendManyData);
      // Add logic to send the data here
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      {/* Open Modal Button */}
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById("sendManyModal").showModal()}
      >
        Open Modal
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
              value={sendManyData.totalAmount}
              onChange={(e) =>
                setSendManyData({
                  ...sendManyData,
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
              value={sendManyData.receiverName}
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
              Send Money
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SendManyModal;
