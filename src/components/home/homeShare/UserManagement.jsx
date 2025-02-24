// UserManagement.js
import axios from "axios";
import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend API
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get("/api/users"); // Replace with your actual API endpoint
  //         setUsers(response.data);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching users:", error);
  //         setLoading(false);
  //       }
  //     };
  //     fetchUsers();
  //   }, []);

  // Handle user status change (approve/block)
  const handleStatusChange = async (userId, status) => {
    try {
      await axios.patch(`/api/users/${userId}`, { status });
      setUsers(
        users.map((user) => (user._id === userId ? { ...user, status } : user))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {user.status === "active" ? "Active" : "Blocked"}
              </td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() =>
                    handleStatusChange(
                      user._id,
                      user.status === "active" ? "blocked" : "active"
                    )
                  }
                  className={`px-4 py-2 rounded text-white ${
                    user.status === "active" ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {user.status === "active" ? "Block" : "Unblock"}
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
