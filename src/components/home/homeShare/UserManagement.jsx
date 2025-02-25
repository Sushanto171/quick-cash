/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosInstance from "../../../hooks/useAxiosInstance";

const UserManagement = ({ user, refetch }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosInstance();
  const navigate = useNavigate();
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

  const [users, setUsers] = useState(user || []);
  useEffect(() => {
    setUsers(user);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  // handle search
  const handleSearch = async () => {
    try {
      if (search === "" || !search) return;
      setLoading(true);
      const { data } = await axiosSecure(`/users/search?query=${search}`);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold ">User Management</h2>
        <div className="flex items-center">
          <label className="input ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="number"
              required
              placeholder="Search by number"
            />
          </label>
          <button onClick={handleSearch} className="btn btn-success text-white">
            Search
          </button>
        </div>
      </div>
      {loading ? (
        "...Loading"
      ) : (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Balance(TK)</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
                <th className="border px-4 py-2">All Transitions</th>
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
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        navigate("/user-transaction", { state: { user } })
                      }
                      className="btn btn-ghost bg-gray-200"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserManagement;
