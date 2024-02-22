import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const decodedToken = jwtDecode(cookies.token);
  console.log("TOKEN" + decodedToken);

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
    return <p>YOU MUST LOG IN</p>;
  }

  console.log("Data: " + data);

  return (
    <div>
      <div>
        <div>
          <h1>{data.username}</h1>
          <p>{data.email}</p>
          <p>{data.bio}</p>
          {}
        </div>
      </div>
    </div>
  );
};

export default Profile;
