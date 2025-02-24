const TransactionActions = () => {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <button className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-700">
        Send Money
      </button>
      <button className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-700">
        Cash Out
      </button>
      <button className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-700">
        Cash In
      </button>
    </div>
  );
};

export default TransactionActions;
