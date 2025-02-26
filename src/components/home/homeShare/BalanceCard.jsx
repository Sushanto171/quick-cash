/* eslint-disable react/prop-types */
import { useState } from "react";

const BalanceCard = ({ balance, admInfo = null }) => {
  const [isBlurred, setIsBlurred] = useState(!admInfo);
  // eslint-disable-next-line no-unused-vars
  const [totalEarning, setTotalEarnings] = useState(
    admInfo?.totalSendMoneyFees || 0
  );
  const handleClick = () => {
    if (!admInfo) {
      setIsBlurred(false);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md my-4 flex  justify-between items-center">
      <div className=" cursor-pointer  " onClick={handleClick}>
        <h3 className="text-xl font-semibold mb-2">
          {admInfo ? "Total Money" : "Your Balance"}{" "}
        </h3>
        <p
          className={`text-2xl font-bold text-green-600 transition-all duration-300 ${
            isBlurred ? "blur-sm" : "blur-0"
          }`}
        >
          ৳ {balance || 0}
        </p>
      </div>
      {admInfo && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Your Earnings</h3>
          <p className="text-2xl font-bold text-red-500">
            {" "}
            ৳ {totalEarning.toFixed(2) || 0}
          </p>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
