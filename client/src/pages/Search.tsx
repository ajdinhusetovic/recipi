import Navbar from "@/components/Navbar";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/recipes/search?query=${search}`
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
      <div>
        <div>
          <h1>Search for users, recipes or tags.</h1>
          <div>
            <input
              type="text"
              className="border"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>search</button>
          </div>
        </div>
        <div>
          <h1>Users</h1>
          {searchResults.users?.length > 0 ? (
            <div>
              {searchResults.users?.map((user) => (
                <div>
                  <img src={user.image} alt="Profile picture" />
                  <h1>{user.username}</h1>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {searchResults.recipes?.length > 0 ? (
            <div>
              {searchResults.recipes?.map((recipe) => (
                <RecipeCard recipe={recipe} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
