import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "./../hooks/useAxiosInstance";

const Register = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    mobileNumber: "",
    email: "",
    role: "user",
    nid: "",
  });

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Identity number
      const mobileNumber = formData?.mobileNumber;
      const phoneRegex = /^01[3-9]\d{8}$/;
      let approve = formData?.role === "agent" ? false : "";
      if (approve !== "") {
        setFormData((prev) => ({
          ...prev,
          approve,
        }));
      }
      if (!phoneRegex.test(mobileNumber)) {
        toast.error("Invalid mobile number");
        return;
      }

      // save data db
      const res = await axiosInstance.post("/register", formData);
      const { data } = res;

      toast.success(data?.message);
      if (res?.status === 201) {
        if (data?.token) {
          localStorage.setItem("token", data?.token);
        }
        setUser(data?.data || null);
        navigate("/");
        if (data.bonus) toast.success(`Congratulations! You get 40 tk bonus.`);
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
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Grid Layout for Large Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                5-Digit PIN
              </label>
              <input
                type="password"
                name="pin"
                value={formData.pin || ""}
                onChange={handleChange}
                placeholder="Enter 5-digit PIN"
                className="input input-bordered w-full"
                maxLength={5}
                pattern="\d{5}"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleChange}
                placeholder="+880**********"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Account Type
              </label>
              <select
                name="role"
                className="select select-bordered w-full"
                value={formData.role || "user"}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                NID Number
              </label>
              <input
                type="text"
                name="nid"
                value={formData.nid || ""}
                onChange={handleChange}
                placeholder="Enter your NID number"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6">
            {loading ? "..." : ""} Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/log-in")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
