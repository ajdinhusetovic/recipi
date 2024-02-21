import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "@/types/RecipeInterface";
import { useEffect } from "react";

const Recipes = () => {
  const cachedDataString = localStorage.getItem("recipes");
  let cachedData;

  if (cachedDataString) {
    cachedData = JSON.parse(cachedDataString);
  } else {
    console.log("No data in local storage");
  }

  const fetchRecipeData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/recipes");
      const recipes = response.data.recipes;

      localStorage.setItem("recipes", JSON.stringify(recipes));

      return recipes;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipeData,
  });

  useEffect(() => {
    fetchRecipeData();
  }, []);

  return (
    <div className="h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <div className="p-10 flex gap-12">
          {cachedData &&
            cachedData.map((recipe: Recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;