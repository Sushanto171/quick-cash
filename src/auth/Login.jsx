/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxiosInstance";

const Login = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const identifyInputType = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (emailRegex.test(input)) {
      return "email";
    } else if (phoneRegex.test(input)) {
      return "phone";
    } else {
      toast.error("Invalid email or phone number");
      return null;
    }
  };

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const identify = identifyInputType(formData.identifier);

      if (!identify) {
        return; // Invalid input, stop execution
      }

      const loginData = {
        [identify === "email" ? "email" : "mobileNumber"]: formData.identifier,
        pin: formData.password,
      };

      // db operation
      const { data } = await axiosInstance.post("/log-in", loginData);
      toast.success(data.message);

      // Here you can send `loginData` to the server
    } catch (error) {
      // console.log(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Log In to Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email or Phone
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="+880***********"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Pin (digit)
            </label>
            <input
              type="password"
              name="password"
              value={formData.pin}
              onChange={handleChange}
              placeholder="*****"
              pattern="\d{5}"
              maxLength={5}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
