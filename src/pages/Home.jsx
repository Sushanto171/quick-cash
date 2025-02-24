import AdminHome from "../components/home/AdminHome";
import AgentHome from "../components/home/AgentHome";
import UserHome from "../components/home/UserHome";
import useRole from "../hooks/useRole";

const Home = () => {
  const userRole = useRole();
  return (
    <div>
      {userRole === "user" && <UserHome />}
      {userRole === "agent" && <AgentHome />}
      {userRole === "admin" && <AdminHome />}
    </div>
  );
};

export default Home;
