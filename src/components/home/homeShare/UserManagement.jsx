/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import useSecureAxios from "../../../hooks/useSecureAxios";

const UserManagement = ({ users, refetch }) => {
  const axiosSecure = useSecureAxios();
  const handleStatusChange = async (userId, currentStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/users/${userId}`, {
        status: !currentStatus,
      });
      toast.success(data?.message);
      refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Balance(TK)</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.amount}</td>
              <td className="border px-4 py-2">
                {user.status ? (
                  <span className="text-red-500 font-bold">Blocked</span>
                ) : (
                  <span className="text-green-500 font-bold">Active</span>
                )}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleStatusChange(user._id, user.status)}
                  className={`px-4 py-2 btn rounded text-white transition ${
                    user.status
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {user.status ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
