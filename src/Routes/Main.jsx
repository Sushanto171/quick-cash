import { Outlet } from "react-router";
import Container from "../components/share/Container";
import Footer from "../components/share/Footer";
import Navbar from "../components/share/Navbar";

const Main = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
