import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/RecipeInterface";

interface SearchResults {
  recipes?: Recipe[];
  tags?: Recipe[];
}

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults>();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://recipie-api.onrender.com/recipes/search?query=${search}`
      );
      console.log(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className="w-11/12 mx-auto flex flex-col justify-center items-center mt-4">
          <h1 className="mb-4 text-2xl md:text-4xl">Search recipes or tags</h1>
          <div className="flex gap-2 w-full items-center justify-center max-w-[800px]">
            <input
              type="text"
              className="border rounded p-1 md:w-1/2"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="font-medium bg-violet-500 hover:bg-violet-600"
            >
              Search
            </Button>
          </div>
        </div>
        <div className="md:w-10/12 lg:w-11/12 mx-auto flex flex-col items-center justify-center md:items-baseline md:justify-normal mt-8">
          {searchResults?.recipes?.length &&
            Array.isArray(searchResults.recipes) && (
              <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
                {searchResults.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}

          {searchResults?.tags?.length && Array.isArray(searchResults.tags) && (
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-center lg:items-baseline lg:justify-normal  gap-8">
              {searchResults.tags.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}

          {searchResults?.recipes?.length === 0 &&
            searchResults.tags?.length === 0 && (
              <p className="w-full text-center text-2xl mt-1">
                No results found.
              </p>
            )}
        </div>
      </div>
    </>
  );
};

export default Search;
