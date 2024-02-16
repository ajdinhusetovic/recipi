import { useState } from "react";
import axios from "axios";
import InputComponent from "../utils/InputComponent";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/users/register", {
        username: username,
        email: email,
        password: password,
      });

      toast({ title: "Account created", variant: "success" });
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
        <h1 className="text-black text-7xl font-semibold mt-24">
          Saving and browsing for recipes has never been easier.
        </h1>
      </div>
      <div className="w-3/5 flex flex-col items-center justify-center p-10">
        <h1 className="text-black font-medium text-5xl text-center p-14">
          Create your Recipie account.
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col gap-3 items-center"
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
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="text-1xl mt-4"
          >
            Create my account
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
