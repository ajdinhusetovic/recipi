import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StepInterface } from "@/types/StepInterface";

const RecipePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes", slug], // Include slug in queryKey to make it unique for each recipe
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

  console.log(data);

  return (
    <div className="w-full">
      <div className="w-8/12 my-0 mx-auto flex flex-col">
        <div className="w-7/12 flex flex-col">
          <h1 className="text-4xl font-medium my-6">{data.name}</h1>
          <img
            src={data.image}
            alt=""
            width={500}
            className="float-left justify-self-start"
          />
          <div className="my-5">
            <p className="text-lg">{data.description}</p>
          </div>
          <div className="my-5">
            <h1 className="text-3xl font-medium py-3">Ingredients</h1>
            <ul>
              {data.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="list-disc ml-8 text-lg py-1">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="my-5">
            <h1 className="text-3xl font-medium py-3">How do I make it?</h1>
            {data.steps.map((step: StepInterface) => (
              <div key={step.stepNumber} className="py-2">
                <h2 className="text-2xl font-medium">Step {step.stepNumber}</h2>
                <p className="text-lg">{step.instruction}</p>
              </div>
            ))}
          </div>
          <p className="self-end mb-5">
            Recipe created by {data.user.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
