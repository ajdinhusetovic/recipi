import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "@/types/RecipeInterface";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

const Recipes = () => {
  // const cachedDataString = localStorage.getItem("recipes");
  // let cachedData;

  // if (cachedDataString) {
  //   cachedData = JSON.parse(cachedDataString);
  // } else {
  //   console.log("No data in local storage");
  // }

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipes");
      const recipes = response.data.recipes;

      // localStorage.setItem("recipes", JSON.stringify(recipes));

      return recipes;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipeData,
  });

  useEffect(() => {
    fetchRecipeData();
  }, []);

  console.log(data);

  return (
    <>
      <Navbar />
      <div className="h-screen">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          <div className="py-10 md:w-11/12 mx-auto flex flex-col gap-8 items-center justify-center md:flex-row md:flex-wrap lg:justify-normal">
            {data &&
              data.map((recipe: Recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;
