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
    <div className="w-full">
      <div className="w-8/12 my-0 mx-auto flex flex-col">
        <div className="w-7/12 flex flex-col">
          <h1 className="text-4xl font-medium">{data.name}</h1>
          <img
            src={data.image}
            alt=""
            width={500}
            className="float-left justify-self-start"
          />
          <div className="my-5">
            <h1 className="text-3xl font-medium py-3">Description</h1>
            <p className="text-lg">{data.description}</p>
          </div>
          <div className="my-5">
            <h1 className="text-3xl font-medium py-3">Ingredients</h1>
            <ul>
              {data.ingredients.map((ingredient) => (
                <li className="list-disc ml-8 text-lg">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="my-5">
            <h1 className="text-3xl font-medium py-3">How do I make it?</h1>
            {data.steps.map((step) => (
              <div className="py-2">
                <h2 className="text-2xl font-medium">Step {step.stepNumber}</h2>
                <p className="text-lg">{step.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
