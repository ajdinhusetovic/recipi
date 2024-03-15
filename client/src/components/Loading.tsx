import React from "react";

interface LoadingInterface {
  loadingText: string;
}
const Loading: React.FC<LoadingInterface> = ({ loadingText }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <svg
        className="animate-spin "
        fill="none"
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4"
          stroke="violet"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
        />
      </svg>
      <h1 className="text-violet-50 mt-2 font-medium tracking-wide">
        {loadingText}
      </h1>
    </div>
  );
};

export default Loading;
