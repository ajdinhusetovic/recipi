import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import profileAvatar from "../../public/account-avatar-profile-user-11-svgrepo-com.svg";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/RecipeInterface";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface DecodedToken {
  username: string;
}

const UserProfile = () => {
  const navigate = useNavigate();

  const { username } = useParams();
  const [cookies, setCookie] = useCookies();

  const { toast } = useToast();

  const [usernameEdit, setUsernameEdit] = useState("");
  const [bioEdit, setBioEdit] = useState("");

  const decodedToken: DecodedToken = jwtDecode(cookies.token);

  const cachedDataString = localStorage.getItem("recipes");
  let cachedData;

  if (cachedDataString) {
    cachedData = JSON.parse(cachedDataString);
  } else {
    console.log("No data in local storage");
  }

  const { isLoading, error, data, refetch } = useQuery({
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

  const isSameUser = decodedToken.username === data.username;

  const handleUserUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/user`,
        {
          username: usernameEdit || data.username,
          bio: bioEdit || data.bio,
        },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      );
      const newToken = response.data.user.token;
      setCookie("token", newToken, { path: "/" });
      navigate(`/users/${usernameEdit}`);
      window.location.reload();
      await refetch();
    } catch (error) {
      console.log(error);
      const errorMessages = error.response.data.message;

      if (Array.isArray(errorMessages)) {
        toast({
          title:
            errorMessages[0] || "There has been an error updating your account",
          variant: "fail",
        });
      } else if (typeof errorMessages === "string") {
        // Handle single error message
        toast({
          title:
            errorMessages || "There has been an error creating your account",
          variant: "fail",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-7/12 my-0 mx-auto h-full flex items-center">
        <div className="w-7/12  my-0 mx-auto flex flex-col items-center">
          <img src={profileAvatar} alt="" width={100} />
          <h1 className="text-5xl font-medium py-4">{data.username}</h1>
          <p className="text-2xl mt-4 w-11/12 mx-auto text-center">
            {data.bio}
          </p>
          {isSameUser && (
            <Dialog>
              <DialogTrigger>
                <Button className="mt-4">Edit profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Click Save Changes to finish updating your profile.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col">
                    <label>Username</label>
                    <input
                      type="text"
                      onChange={(e) => setUsernameEdit(e.target.value)}
                      className="border outline-none p-1 rounded"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label>
                      Bio{" "}
                      <span className="text-sm text-gray-500">
                        (Max 200 characters)
                      </span>
                    </label>
                    <textarea
                      onChange={(e) => setBioEdit(e.target.value)}
                      className="border outline-none p-1 rounded resize-none"
                      rows={6}
                    />
                  </div>
                </div>
                <Button
                  className="w-1/2 float-right"
                  onClick={handleUserUpdate}
                >
                  Save Changes
                </Button>
              </DialogContent>
            </Dialog>
          )}
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
