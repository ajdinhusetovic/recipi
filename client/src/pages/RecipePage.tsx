import React from "react";
import Recipe from "@/types/RecipeInterface";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RecipePage: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const { slug } = useParams<{ slug: string }>();

  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/recipes/${slug}`);
      return response.data;
    },
  });

  console.log(data);

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt="" width={500} />
    </div>
  );
};

export default RecipePage;
