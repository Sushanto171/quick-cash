import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Container from "./Container";
const Navbar = () => {
  const { setUser } = useAuth();
  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <div className="bg-blue-500 shadow-sm">
      <Container>
        <header className=" text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Quick Cash</h1>
          <nav>
            <Link className="mx-4">Profile</Link>
            <button onClick={handleLogOut} className="btn">
              Logout
            </button>
          </nav>
        </header>
      </Container>
    </div>
  );
};

export default Navbar;
