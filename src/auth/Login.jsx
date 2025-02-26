/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxiosInstance";
import { useFingerprint } from "../utilies";

const Login = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const deviceId = useFingerprint();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    pin: "",
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
      setLoading(true);

      const identify = identifyInputType(formData.identifier);
      if (!identify) {
        return; // Invalid input, stop execution
      }

      const loginData = {
        [identify === "email" ? "email" : "mobileNumber"]: formData.identifier,
        pin: formData.password,
        deviceId,
      };

      // db operation
      const { data } = await axiosInstance.post("/log-in", loginData);
      toast.success(data.message);
      if (data) {
        if (data?.token) {
          localStorage.setItem("token", data.token);
        }
        setUser(data?.data || null);
        navigate("/");
        setFormData({
          name: "",
          pin: "",
          mobileNumber: "",
          email: "",
          role: "user",
          nid: "",
        });
      }
    } catch (error) {
      // console.log(error);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ">
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
              value={formData.identifier || ""}
              onChange={handleChange}
              placeholder="Phone number"
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
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="*****"
              pattern="\d{5}"
              maxLength={5}
              className="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            {loading ? "..." : ""} Log In
          </button>
        </form>
        {/* Auto Credential Dropdown */}
        <details className="dropdown w-full mt-4">
          <summary className="btn m-1">Use Auto Credentials</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a
                onClick={() =>
                  setFormData({
                    identifier: "admin@info.com",
                    password: "12345",
                  })
                }
                className="cursor-pointer"
              >
                Admin Credential
              </a>
            </li>
            <li>
              <a
                onClick={() =>
                  setFormData({
                    identifier: "agent@gmail.com",
                    password: "12345",
                  })
                }
                className="cursor-pointer"
              >
                Agent Credential
              </a>
            </li>
            <li>
              <a
                onClick={() =>
                  setFormData({
                    identifier: "user@gmail.com",
                    password: "12345",
                  })
                }
                className="cursor-pointer"
              >
                User Credential
              </a>
            </li>
          </ul>
        </details>

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
