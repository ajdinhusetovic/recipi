import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types/RecipeInterface";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigate = useNavigate();

  let difficultyColor = "";
  const recipeTime = recipe.prepTime + recipe.cookTime;

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
      className="w-56 h-[350px] md:h-[450px] md:w-72 border flex flex-col cursor-pointer"
      onClick={() => navigate(`/recipes/${recipe.slug}`)}
    >
      <img src={recipe.image} alt="" className="h-1/2 w-full object-contain" />
      <div className="w-11/12 h-1/2 my-0 mx-auto">
        <div className="flex items-center my-2">
          <p className="">{recipeTime} mins</p>
          <div
            className={`${difficultyColor} w-16 md:w-[100px] rounded ml-3 flex items-center justify-center`}
          >
            <p className="font-medium text-sm md:text-lg text-center">
              {recipe.difficulty}
            </p>
          </div>
        </div>
        <ul className="flex gap-2 mt-1 md:mt-3 flex-wrap">
          {recipe.tags.map((tag: string, index: number) => (
            <li key={index} className="bg-violet-50 p-1 rounded">
              <p className="text-center text-violet-500 font font-medium text-sm md:text-lg">
                {tag}
              </p>
            </li>
          ))}
        </ul>
        <h1 className="text-[20px] md:text-2xl mt-2 md:mt-3">
          {truncatedTitle}
        </h1>
      </div>
    </div>
  );
};

export default RecipeCard;
