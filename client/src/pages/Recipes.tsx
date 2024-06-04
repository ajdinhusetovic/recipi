import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Recipe } from "@/types/RecipeInterface";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast.ts";
import Loading from "@/components/Loading.tsx";

const Recipes = () => {
  const fetchRecipeData = async () => {
    try {
      const response = await axios.get(
        "https://recipie-api.onrender.com/recipes"
      );
      const recipes = response.data.recipes;

      return recipes;
    } catch (error) {
      toast({ title: "Something went wrong", variant: "fail" });
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipeData,
  });

  useEffect(() => {
    fetchRecipeData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen">
        {isLoading ? (
          <Loading loadingText="Loading recipes..." />
        ) : error ? (
          <p>Error fetching data: {error.message}</p>
        ) : (
          <div className="py-10 md:w-10/12 mx-auto flex flex-col gap-8 items-center justify-center md:flex-row md:flex-wrap lg:justify-normal">
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
