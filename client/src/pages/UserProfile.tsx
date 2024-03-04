import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import profileAvatar from "../../public/account-avatar-profile-user-11-svgrepo-com.svg";
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
import Navbar from "@/components/Navbar";

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
  const [email, setEmail] = useState("");
  const [file, setFile] = useState();

  const decodedToken: DecodedToken | null = cookies.token
    ? jwtDecode(cookies.token)
    : null;

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

  const isSameUser = decodedToken && decodedToken.username === data.username;

  const handleUserUpdate = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }
    if (usernameEdit) {
      formData.append("username", usernameEdit);
    }
    if (bioEdit) {
      formData.append("bio", bioEdit);
    }
    if (email) {
      formData.append("email", email);
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/users/user`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newToken = response.data.user.token;
      setCookie("token", newToken, { path: "/" });
      navigate(`/users/${usernameEdit || data.username}`);
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
        toast({
          title:
            errorMessages || "There has been an error creating your account",
          variant: "fail",
        });
      }
    }
  };

  console.log(data);
  console.log(file);

  return (
    <>
      <Navbar />
      <div className="w-full mt-8">
        <div className="w-11/12 lg:w-7/12 my-0 mx-auto h-full flex items-center">
          <div className="w-11/12 lg:w-full my-0 mx-auto flex flex-col items-center">
            <img src={data.image} alt="" width={100} className="rounded-full" />
            <h1 className="text-4xl md:text-5xl font-medium pt-4">
              {data.username}
            </h1>
            <p className="text-lg md:text-2xl mt-5 w-11/12 mx-auto text-center">
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
                    <div className="flex flex-col">
                      <label>Email</label>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="border outline-none p-1 rounded"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label>
                        Bio
                        <span className="text-sm ml-1 text-gray-500">
                          (Max 200 characters)
                        </span>
                      </label>
                      <textarea
                        onChange={(e) => setBioEdit(e.target.value)}
                        className="border outline-none p-1 rounded resize-none"
                        rows={6}
                      />
                      <div className="mt-3">
                        <label>Profile picture</label>
                        <input
                          className="mt-1 block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
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
            <div className="border w-full overflow-y-auto max-w-[640px] flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-4 py-4 mb-5">
              {data.recipes.map((recipe: Recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
