import RecipeCard from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Recipe from "@/types/RecipeInterface";

const Recipes = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/recipes");
      return response.data.recipes;
    },
  });

  console.log(data);

  return (
    <div className="h-screen">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <div className="p-10 flex gap-12">
          {data &&
            data.map((recipe: Recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
