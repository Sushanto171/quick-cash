/* eslint-disable react/prop-types */

const BalanceCard = ({ balance }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-4">
      <h3 className="text-xl font-semibold mb-2">Your Balance</h3>
      <p className="text-2xl font-bold text-green-600">৳ {balance || 0}</p>
    </div>
  );
};

export default BalanceCard;
