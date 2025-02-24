import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("User");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Create an Account
        </h2>
        <form>
          {/* Grid Layout for Large Devices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
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
                placeholder="Enter your mobile number"
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
                className="select select-bordered w-full"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-1">
                NID Number
              </label>
              <input
                type="text"
                placeholder="Enter your NID number"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-full mt-6">Register</button>
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
