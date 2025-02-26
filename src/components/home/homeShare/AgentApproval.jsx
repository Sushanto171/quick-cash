/* eslint-disable react/prop-types */
import useSecureAxios from "../../../hooks/useSecureAxios";

const AgentApproval = ({ agents, refetch, adminInfo }) => {
  const axiosSecure = useSecureAxios();

  const handleApproval = async (mobileNumber, status, name) => {
    await axiosSecure.patch(`agents-approval`, {
      mobileNumber: mobileNumber,
      approved: status,
      name: name,
    });
    refetch();
    adminInfo();
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Agent Approvals</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className=" ">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents?.map((agent) => (
              <tr key={agent._id} className="text-center">
                <td className="border px-4 py-2">{agent.name}</td>
                <td className="border px-4 py-2">{agent.email}</td>
                <td className="border px-4 py-2">{agent.mobileNumber}</td>
                <td className="border px-4 py-2">
                  <button
                    disabled={agent.approve}
                    className="btn bg-green-500 text-white px-3 py-1 disabled:bg-gray-400 disabled:text-gray-500 rounded mr-2"
                    onClick={() =>
                      handleApproval(agent.mobileNumber, true, agent.name)
                    }
                  >
                    {agent.approve ? "Approved" : "Approve"}
                  </button>
                  <button
                    disabled={!agent.approve}
                    className="btn bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      handleApproval(agent.mobileNumber, false, agent.name)
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentApproval;
