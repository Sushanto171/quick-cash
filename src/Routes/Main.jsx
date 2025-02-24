import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Container from "../components/share/Container";
import Footer from "../components/share/Footer";
import Navbar from "../components/share/Navbar";
import useAuth from "../hooks/useAuth";

const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      return navigate("/log-in");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="min-h-[calc(100vh-135px)]">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
