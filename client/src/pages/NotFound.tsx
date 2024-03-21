import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center bg-violet-500">
      <div className=" w-[900px] h-[600px] rounded flex flex-col items-center">
        <h1 className="text-center pb-2 text-4xl md:text-9xl text-violet-50 mt-14">
          404
        </h1>
        <p className="text-violet-50 md:text-4xl mt-8">
          Oops! The page you're looking for does not exist.
        </p>
        <button
          className="bg-violet-50 p-4 w-[150px] mt-16 rounded text-violet-500 hover:bg-violet-100"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
