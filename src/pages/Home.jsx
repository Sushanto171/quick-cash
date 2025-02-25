/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router";
import AdminHome from "../components/home/AdminHome";
import AgentHome from "../components/home/AgentHome";
import UserHome from "../components/home/UserHome";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/log-in");
    }
  }, [user]);
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
