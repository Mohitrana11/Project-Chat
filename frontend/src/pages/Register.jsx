import { Link, useNavigate } from "react-router-dom";
import register from "../assets/EmployeeImage.webp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../context/api/authSlice";
import toast from "react-hot-toast";
function Register() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInput));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message || "Something went wrong");
    }

    if (isSuccess) {
      toast.success(message || "SignIn successful!");
      navigate("/");
    }
  }, [isError, isSuccess, message]);
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="hidden md:flex">
        <img src={register} alt="Registration" className="w-full h-full" />
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[370px] px-10 ml-5 py-3">
        <h1 className="text-3xl mb-4 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={handleUserInput}
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleUserInput}
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-center mb-4">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
