import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StepInterface } from "@/types/StepInterface";
import RecipeCard from "@/components/RecipeCard";
import Navbar from "@/components/Navbar";
import { Recipe } from "@/types/RecipeInterface";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const RecipePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [cookie, setCookies] = useCookies();

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes", slug],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/recipes/${slug}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  const decodedToken = cookie.token ? jwtDecode(cookie.token) : null;

  const isSameUser =
    decodedToken && decodedToken.username === data.user.username;
  console.log(isSameUser);

  console.log(data);

  const deleteRecipe = async () => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${slug}`, {
        headers: { Authorization: `Bearer ${cookie.token}` },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteRecipe = async () => {
    try {
      await axios.post(
        `http://localhost:3000/recipes/${data.slug}/favorite`,
        null,
        {
          headers: { Authorization: `Bearer ${cookie.token}` },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromFavoritesRecipe = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/recipes/${data.slug}/favorite`,
        {
          headers: { Authorization: `Bearer ${cookie.token}` },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const isRecipeFavorited = data.favorited;

  return (
    <>
      <Navbar />
      <div className="w-full">
        <div className="md:w-8/12 md:my-0 md:mx-auto flex flex-col">
          <div className="lg:w-7/12 flex flex-col">
            <div className="w-11/12 mx-auto md:mx-0 ">
              <h1 className="md:mx-0 text-3xl md:text-4xl lg:text-5xl font-medium my-6">
                {data.name}
              </h1>
              <p className="mb-3 md:pr-0 text-sm md:text-base">
                Recipe created by{" "}
                <span
                  className="text-red-500 underline cursor-pointer"
                  onClick={() => navigate(`/users/${data.user.username}`)}
                >
                  {data.user.username}
                </span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/recipes/edit/${data.slug}`)}
                  className={`${
                    isSameUser ? "" : "hidden"
                  } w-[100px] bg-violet-50 mb-3 mt-1 rounded p-2 text-violet-500 hover:bg-violet-100`}
                >
                  Edit
                </button>
                <button
                  onClick={deleteRecipe}
                  className={`${
                    isSameUser ? "" : "hidden"
                  } w-[100px] bg-violet-50 mb-3 mt-1 rounded p-2 text-violet-500 hover:bg-violet-100`}
                >
                  Delete
                </button>
                {isRecipeFavorited ? (
                  <button
                    onClick={handleRemoveFromFavoritesRecipe}
                    className={`${
                      isSameUser ? "hidden" : ""
                    } bg-violet-50 mb-3 mt-1 rounded text-violet-500 p-2 hover:bg-violet-100`}
                  >
                    Unsave recipe
                  </button>
                ) : (
                  <button
                    onClick={handleFavoriteRecipe}
                    className={`${
                      isSameUser ? "hidden" : ""
                    }  bg-violet-50 mb-3 mt-1 rounded text-violet-500 p-2 hover:bg-violet-100`}
                  >
                    Save recipe
                  </button>
                )}
              </div>
            </div>
            <img
              src={data.image}
              alt=""
              width={700}
              className="float-left justify-self-start w-11/12 mx-auto md:mx-0"
            />
            <div className="w-11/12 mx-auto md:w-full mt-4">
              <p className="text-lg">{data.description}</p>
            </div>
            <div className="my-5">
              <h1 className="text-3xl font-medium p-3">Ingredients</h1>
              <ul>
                {data.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="list-disc ml-8 text-lg py-1">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 md:p-0  my-5">
              <h1 className="text-3xl font-medium py-3">How do I make it?</h1>
              {data.steps.map((step: StepInterface) => (
                <div key={step.stepNumber} className="py-2">
                  <h2 className="text-2xl font-medium">
                    Step {step.stepNumber}
                  </h2>
                  <p className="text-lg">{step.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {data.similarRecipes ? (
          ""
        ) : (
          <div className="mt-5">
            <div>
              <h1 className="text-3xl text-center">You might also like</h1>
              <div className="w-11/12 mx-auto flex flex-col justify-center items-center my-8 gap-4 md:flex-row md:flex-wrap">
                {data.similarRecipes.map((recipe: Recipe) => (
                  <RecipeCard recipe={recipe} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipePage;
