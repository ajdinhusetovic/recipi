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
    <div className="flex flex-col xl:flex-row min-h-screen h-screen">
      <div className="w-full h-1/4 xl:w-2/5 xl:h-full bg-gradient-to-l from-orange-500 via-orange-400 to-yellow-300 flex items-center justify-center xl:block xl:p-10">
        <h1 className="text-3xl md:text-4xl text-center xl:text-left xl:text-7xl font-semibold xl:mt-24">
          Saving and browsing for recipes has never been easier.
        </h1>
      </div>
      <div className="mt-10 md:mt-0 w-full h-full xl:w-3/5 xl:h-full flex flex-col items-center md:justify-center xl:p-10">
        <h1 className="text-3xl md:text-4xl font-medium xl:text-5xl text-center xl:p-14">
          Log In To Your Recipie Account.
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 items-center mt-8 xl:mt-0"
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
          <div className="flex items-center justify-center gap-3 w-11/12 md:w-full">
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
