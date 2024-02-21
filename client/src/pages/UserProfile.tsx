import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import profileAvatar from "../../public/account-avatar-profile-user-11-svgrepo-com.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/RecipeInterface";

const UserProfile = () => {
  const { username } = useParams();
  const [cookies, _] = useCookies();

  const cachedDataString = localStorage.getItem("recipes");
  let cachedData;

  if (cachedDataString) {
    cachedData = JSON.parse(cachedDataString);
  } else {
    console.log("No data in local storage");
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/users/${username}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
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
    <div className="w-full h-screen">
      <div className="w-7/12 my-0 mx-auto h-full flex items-center">
        <div className="w-7/12  my-0 mx-auto flex flex-col items-center">
          <img src={profileAvatar} alt="" width={100} />
          <h1 className="text-5xl font-medium py-4">{data.username}</h1>
          <p className="text-2xl mt-4 w-11/12 mx-auto text-center">
            {data.bio}
          </p>
          <p className="text-lg mt-8 mb-3">
            Recipes created: {data.recipes.length}
          </p>
          <div className="border w-full overflow-y-auto h-[500px] flex justify-center gap-4 pt-4">
            {data.recipes.map((recipe: Recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
