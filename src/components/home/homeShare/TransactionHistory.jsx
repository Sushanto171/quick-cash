/* eslint-disable react/prop-types */

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-4">
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <ul className="space-y-4">
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{transaction.description}</span>
            <span
              className={`text-${
                transaction.type === "income" ? "green" : "red"
              }-600 font-semibold`}
            >
              {transaction.amount > 0
                ? `+৳${transaction.amount}`
                : `-৳${Math.abs(transaction.amount)}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
