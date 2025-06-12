import { Link, useNavigate } from "react-router-dom";
import login from "../assets/EmployeeImage.webp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../context/api/authSlice";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const [userInput, setUserInput] = useState({
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
    dispatch(loginUser(userInput));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      toast.success(message || "Login Successful!");
      navigate("/");
    }
    if (isError) {
      toast.error(message || "Something went wrong");
    }
  }, [isError, isSuccess, message]);

  return (
    <div className="fixed w-full h-screen bg-gray-100 flex items-center justify-center px-4 py-4 overflow-hidden z-90 ">
      <div className="hidden md:flex">
        <img src={login} alt="Login" className="w-full h-full" />
      </div>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[370px] px-10 ml-5">
        <h1 className="text-3xl text-center mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleUserInput}
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none focus:border-blue-500"
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
              className="w-full px-4 py-3 outline-none border-none rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Login..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p>
            Not a{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register User?
            </Link>
          </p>
        </div>
        {isError && toast.error(message)}
        {isSuccess && toast.success(message)}
      </div>
    </div>
  );
}

export default Login;
