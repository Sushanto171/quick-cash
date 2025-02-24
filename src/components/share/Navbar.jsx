import { Link } from "react-router";
import Container from "./Container";
const Navbar = () => {
  return (
    <div className="bg-blue-500 shadow-sm">
      <Container>
        <header className=" text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">MFS App</h1>
          <nav>
            <Link className="mx-4">Profile</Link>
            <Link className="mx-4">Logout</Link>
          </nav>
        </header>
      </Container>
    </div>
  );
};

export default Navbar;
