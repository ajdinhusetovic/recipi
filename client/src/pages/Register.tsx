import { useState } from "react";
import axios from "axios";
import InputComponent from "@/components/InputComponent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading.tsx";

const Register = () => {
  const navigate = useNavigate();

  const url = "https://recipie-api.onrender.com/users/register";

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(url, {
        username: username,
        email: email,
        password: password,
      });

      toast({ title: "Account created", variant: "success" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessages = error.response.data.message;

        if (Array.isArray(errorMessages)) {
          toast({
            title:
              errorMessages[0] ||
              "There has been an error creating your account",
            variant: "fail",
          });
        } else if (typeof errorMessages === "string") {
          toast({
            title:
              errorMessages || "There has been an error creating your account",
            variant: "fail",
          });
        } else {
          toast({ title: "An unexpected error occurred", variant: "fail" });
        }
      } else {
        toast({ title: "An error occurred", variant: "fail" });
      }
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return isLoading ? (
    <Loading loadingText="Creating account..." />
  ) : (
    <div className="flex flex-col xl:flex-row h-screen bg-violet-500 xl:bg-white">
      <div className=" hidden w-full h-1/4 xl:w-2/5 xl:h-full bg-gradient-to-l from-orange-500 via-orange-400 to-yellow-300 items-center justify-center xl:block xl:p-10">
        <h1 className="text-2xl md:text-3xl text-center xl:text-left xl:text-7xl font-semibold xl:mt-24">
          Saving and browsing for recipes has never been easier.
        </h1>
      </div>
      <div className="mt-5 md:mt-10 lg:mt-0 w-full h-full xl:w-3/5 xl:h-full flex flex-col items-center justify-center xl:p-10">
        <h1 className="text-3xl md:text-4xl font-medium xl:text-5xl text-center xl:p-14 text-violet-50 xl:text-dark-text">
          Create your Recipie account.
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-2 items-center mt-4 xl:mt-0"
        >
          <InputComponent
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputComponent
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputComponent
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="/"
            className="underline text-violet-50 xl:text-violet-500 font-medium text-sm"
          >
            Continue without account
          </a>
          <div className="flex items-center justify-center gap-3 w-11/12 md:w-full mb-12">
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="text-1xl mt-4 text-violet-500 w-1/2 bg-violet-50"
            >
              Create my account
            </Button>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              variant="secondary"
              className="text-1xl mt-4 text-violet-500 w-1/2 bg-violet-50"
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
