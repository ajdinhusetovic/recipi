import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/RecipeInterface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  username: string;
}

const SavedRecipes = () => {
  let decoded: DecodedToken | undefined;

  const token = localStorage.getItem("token");

  if (token) {
    decoded = jwtDecode(token);
  }

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(
        `https://recipie-api.onrender.com/users/${decoded?.username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <>
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
          <h1 className="text-violet-50 mt-2">Loading...</h1>
        </div>
        ;
      </>
    );
  }

  return (
    <>
      <Navbar />
      {decoded ? (
        <>
          <h1 className="text-4xl w-11/12 mx-auto md:text-5xl mt-8">
            Saved recipes
          </h1>
          <div className="w-11/12 mx-auto flex flex-col items-center justify-center my-12 md:flex-row md:justify-start md:items-start">
            {data &&
              data.favorites &&
              data.favorites.map((recipe: Recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="bg-violet-500 p-4 w-9/12 lg:w-6/12 mx-auto mt-32 flex items-center justify-center rounded-md">
            <h1 className="text-3xl p-6 w-11/12 mx-auto md:text-4xl text-violet-50 text-center font-medium">
              Please log in to save and view saved recipes.
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default SavedRecipes;
