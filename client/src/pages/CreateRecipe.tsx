import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const MAX_CHAR_LENGTH = 25;
  const { toast } = useToast();

  const [cookie, setCookies] = useCookies();

  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");

  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);

  const [recipeDifficulty, setRecipeDifficulty] = useState("");

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState("");

  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [file, setFile] = useState();

  const handleIngredientInput = (e) => {
    if (e.target.value.length <= MAX_CHAR_LENGTH) {
      setIngredient(e.target.value);
    } else {
      console.log("ERROR");
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ingredient]);
    setIngredient("");
  };

  const addInstruction = () => {
    setInstructions([...instructions, instruction]);
    setInstruction("");
  };

  const removeLastInstruction = () => {
    const updatedInstructions = [...instructions];
    updatedInstructions.pop();
    setInstructions(updatedInstructions);
  };

  const addTag = () => {
    const trimmedTag = tag.trim();

    if (tags.length < 3 && trimmedTag !== "" && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTag("");
    } else if (tags.includes(trimmedTag)) {
      toast({
        title: "Tag already exists",
        variant: "fail",
      });
    } else if (trimmedTag === "") {
      toast({
        title: "Tag cannot be empty",
        variant: "fail",
      });
    } else {
      toast({
        title: "Maximum of 3 tags",
        variant: "fail",
      });
    }
  };

  console.log(ingredients);

  const submitRecipe = async () => {
    const formData = new FormData();

    formData.append("file", file || "");
    formData.append("name", recipeName);
    formData.append("description", recipeDescription);
    formData.append("prepTime", prepTime.toString());
    formData.append("cookTime", cookTime.toString());
    formData.append("difficulty", recipeDifficulty);
    formData.append("instructions[]", "osman");
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    instructions.forEach((instruction, index) => {
      formData.append(`steps[${index}]`, instruction);
    });
    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      );

      console.log("Recipe submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting recipe", error);
    }
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    console.log(updatedIngredients[index]);
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex flex-col mt-5 w-11/12 mx-auto">
        <div className="flex flex-col gap-5">
          <p className="flex text-lg flex-wrap">
            {tags.map((tag) => (
              <span className="bg-red-500 ml-2 p-[6px] rounded text-center inline-block">
                {tag}
              </span>
            ))}
          </p>
          <div className="flex flex-col gap-1">
            <label className="text-lg">Recipe name</label>
            <input
              type="text"
              className="border rounded p-1"
              onChange={(e) => setRecipeName(e.target.value)}
              value={recipeName}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg">Description</label>
            <textarea
              className="border resize-none h-[150px]"
              onChange={(e) => setRecipeDescription(e.target.value)}
              value={recipeDescription}
            ></textarea>
          </div>
          <div className="flex gap-2">
            <label className="text-lg">Prep Time</label>
            <input
              type="number"
              className="border w-1/2"
              onChange={(e) => setPrepTime(parseInt(e.target.value))}
              value={prepTime}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-lg">Cook time</label>
            <input
              type="number"
              className="border w-1/2"
              onChange={(e) => setCookTime(parseInt(e.target.value))}
              value={cookTime}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-lg">Recipe difficulty</label>
            <select
              name="recipeDifficulty"
              onChange={(e) => setRecipeDifficulty(e.target.value)}
              className="p-1 rounded bg-red-500"
              value={recipeDifficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col">
            <div>
              <label className="text-lg">Ingredients</label>
              <input
                type="text"
                className="border p-1"
                value={ingredient}
                onChange={(e) => handleIngredientInput(e)}
              />
              <button
                className="bg-gray-200 ml-4 p-1 rounded w-[50px]"
                onClick={addIngredient}
              >
                Add
              </button>
            </div>
            <div>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="list-disc ml-8 mt-4 w-[200px]">
                    {ingredient}
                    <span
                      className="ml-2 p-1 border"
                      onClick={() => removeIngredient(index)}
                    >
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label className="text-lg">Instructions</label>
              <textarea
                name=""
                onChange={(e) => setInstruction(e.target.value)}
                value={instruction}
                className="border p-1 resize-none h-[200px]"
              ></textarea>
              <div className="flex gap-2">
                <button
                  className="bg-gray-200 mt-2 p-1 rounded w-[50px]"
                  onClick={addInstruction}
                >
                  Add
                </button>
                <button
                  className="bg-gray-200 mt-2 p-1 rounded w-[50px]"
                  onClick={removeLastInstruction}
                >
                  Undo
                </button>
              </div>
            </div>
            {instructions.length > 0 && (
              <div className="border rounded mt-2 p-1 h-[300px] overflow-auto">
                {instructions.length > 0 &&
                  instructions.map((inst, index) => (
                    <div key={index}>
                      <h1 className="font-medium text-lg">Step: {index + 1}</h1>
                      <p className="text-md">{inst}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label>Tags</label>
              <input
                type="text"
                className="border w-1/2 p-1"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button
                className="bg-green-200 p-1 rounded w-[50px]"
                onClick={addTag}
              >
                Add
              </button>
            </div>
          </div>
          <div>
            <input
              className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            className="mt-1 mb-4 rounded bg-red-500 w-1/2 mx-auto p-1 text-md"
            onClick={submitRecipe}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
