import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full relative min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-6 overflos-hidden z-50">
      <svg
        className="absolute opacity-10 w-96 h-96 text-white transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 select-none pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        />
      </svg>
      <div className="relative max-w-md text-center text-white">
        <h1 className="text-9xl font-extrabold tracking-tight drop-shadow-lg select-none">
          404
        </h1>
        <p className="mt-4 text-xl sm:text-2xl font-semibold drop-shadow">
          Oops! The page you are looking for could not be found.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex px-6 py-3 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 hover:from-purple-600 hover:via-indigo-700 hover:to-blue-600 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
