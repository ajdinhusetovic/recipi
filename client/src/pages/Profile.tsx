import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/users/me`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
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

  return <div>Profile</div>;
};

export default Profile;
