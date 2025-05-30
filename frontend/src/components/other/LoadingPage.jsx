import React from "react";

const LoadingPage = () => {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 20% { opacity: 0 }
            50% { opacity: 1 }
            100% { opacity: 0 }
          }
        `}
      </style>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white ">
        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></span>
          <span className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-450"></span>
        </div>
        <p className="mt-6 text-lg font-medium tracking-wide select-none flex items-center">
          Loading
          <span className="ml-1">
            <span
              style={{ animation: "blink 1.5s infinite", animationDelay: "0s" }}
            >
              .
            </span>
            <span
              style={{
                animation: "blink 1.5s infinite",
                animationDelay: "0.3s",
              }}
            >
              .
            </span>
            <span
              style={{
                animation: "blink 1.5s infinite",
                animationDelay: "0.6s",
              }}
            >
              .
            </span>
          </span>
        </p>
      </div>
    </>
  );
};

export default LoadingPage;
