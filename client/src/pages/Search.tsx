import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/RecipeInterface";
import { toast } from "@/components/ui/use-toast.ts";
import Loading from "@/components/Loading.tsx";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://recipie-api.onrender.com/recipes/search?query=${search}`,
      );
      const combinedArray = [...response.data.recipes, ...response.data.tags];

      const uniqueResults = Array.from(
        new Set(combinedArray.map((item) => item.slug)),
      ).map((slug) => {
        return combinedArray.find((item) => item.slug === slug);
      });
      setSearchResults(uniqueResults);
    } catch (error) {
      toast({ title: "Something went wrong", variant: "fail" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading loadingText="Searching..." />
      ) : (
        <div className="h-screen md:mt-10">
          <div className="w-11/12 mx-auto flex flex-col justify-center items-center mt-4">
            <h1 className="mb-4 text-2xl md:text-4xl">
              Search recipes or tags
            </h1>
            <div className="flex gap-2 w-full items-center justify-center max-w-[800px] md:mt-3">
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
          <div className="md:w-10/12 lg:w-11/12 mx-auto flex flex-col items-center justify-center md:items-baseline md:justify-normal mt-12">
            {searchResults.length > 0 ? (
              searchResults.map((recipe, index: number) => (
                <RecipeCard recipe={recipe} key={index} />
              ))
            ) : (
              <p className="text-center w-full text-lg text-violet-500">
                No results found.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
