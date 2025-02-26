import AdminHome from "../components/home/AdminHome";
import AgentHome from "../components/home/AgentHome";
import UserHome from "../components/home/UserHome";
import LoadingSpinner from "../components/share/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Home = () => {
  const { loading } = useAuth();
  const userRole = useRole();
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      {userRole === "user" && <UserHome />}
      {userRole === "agent" && <AgentHome />}
      {userRole === "admin" && <AdminHome />}
    </div>
  );
};

export default Home;
