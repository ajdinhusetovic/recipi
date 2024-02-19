import { useState } from "react";
import axios from "axios";
import InputComponent from "@/components/InputComponent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        username: username,
        password: password,
      });

      console.log(response.data);
      const token = response.data.user.token;
      setCookie("token", token, { path: "/" });

      toast({ title: "Log in successful", variant: "success" });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Request failed with status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        toast({
          title:
            error.response?.data.message ||
            "There has been an error creating your account",
          variant: "fail",
        });
      } else {
        console.error(error);
        toast({ title: "An error occurred", variant: "fail" });
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-2/5 bg-gradient-to-l from-orange-500 via-orange-400 to-yellow-300 p-10">
        <h1 className="text-7xl font-semibold mt-24">
          Saving and browsing for recipes has never been easier.
        </h1>
      </div>
      <div className="w-3/5 flex flex-col items-center justify-center p-10">
        <h1 className="font-medium text-5xl text-center p-14">
          Log In To Your Recipie Account.
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 items-center"
        >
          <InputComponent
            label="Username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputComponent
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-center gap-3 w-full">
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              variant="secondary"
              className="text-1xl mt-4 text-dark-text w-1/2"
            >
              Create my account
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="text-1xl mt-4 text-dark-text w-1/2"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
