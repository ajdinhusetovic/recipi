import { Link, useNavigate } from "react-router-dom";
import { Recipe } from "@/types/RecipeInterface";
import { useEffect, useState } from "react";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigate = useNavigate();

  let difficultyColor = "";
  const recipeTime = parseInt(recipe.prepTime) + parseInt(recipe.cookTime);

  const MAX_TITLE_LENGTH = 30;

  const truncatedTitle =
    recipe.name.length > MAX_TITLE_LENGTH
      ? `${recipe.name.slice(0, MAX_TITLE_LENGTH)}...`
      : recipe.name;

  switch (recipe.difficulty.toLowerCase()) {
    case "easy":
      difficultyColor = "bg-green-500";
      break;
    case "medium":
      difficultyColor = "bg-yellow-500";
      break;
    case "hard":
      difficultyColor = "bg-orange-500";
      break;
  }

  return (
    <div
      className="w-56 h-[320px] md:h-96 md:w-72 border flex flex-col cursor-pointer"
      onClick={() => navigate(`/${recipe.slug}`)}
    >
      <img src={recipe.image} alt="" className="w-full h-1/2" />
      <div className="w-11/12 h-1/2 my-0 mx-auto">
        <p className="my-2">{recipeTime} mins</p>
        <ul className="flex gap-2 mt-1 md:mt-3 flex-wrap">
          {recipe.tags.map((tag: string, index: number) => (
            <li key={index} className="bg-red-500 p-1 rounded">
              <p className="text-center font font-medium text-sm md:text-lg">
                {tag}
              </p>
            </li>
          ))}
        </ul>
        <div className={`${difficultyColor} w-16 md:w-[100px] rounded mt-2`}>
          <p className="font-medium text-sm md:text-lg text-center">
            {recipe.difficulty}
          </p>
        </div>
        <h1 className="text-[20px] md:text-2xl mt-2 md:mt-3">
          {truncatedTitle}
        </h1>
      </div>
    </div>
  );
};

export default RecipeCard;
