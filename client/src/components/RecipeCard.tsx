import { Link } from "react-router-dom";
import { Recipe } from "@/types/RecipeInterface";

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const MAX_TITLE_LENGTH = 40;

  const truncatedTitle =
    recipe.name.length > MAX_TITLE_LENGTH
      ? `${recipe.name.slice(0, MAX_TITLE_LENGTH)}...`
      : recipe.name;

  return (
    <div className="h-96 w-72 border flex flex-col">
      <img src={recipe.image} alt="" className="w-full" />
      <div className="w-11/12 my-0 mx-auto">
        <ul className="flex gap-2 mt-3">
          {recipe.tags.map((tag: string, index: number) => (
            <li key={index} className="bg-red-500 w-16 rounded">
              <p className="text-center font-medium">{tag}</p>
            </li>
          ))}
        </ul>
        <h1 className="text-2xl mt-3">{truncatedTitle}</h1>

        <Link to={`/${recipe.slug}`} className="underline float-right mt-4">
          View recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
