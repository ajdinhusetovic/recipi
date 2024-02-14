import { useState } from "react";
import axios from "axios";
import InputComponent from "../utils/InputComponent";
import { Button } from "@/components/ui/button";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = (e) => {
    e.preventDefault();

    try {
      axios.post("http://localhost:3000/users/register", {
        username: username,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="flex flex-col item-scenter justify-center gap-10">
        <h1 className="text-white text-4xl">Create your account</h1>
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
          <Button type="submit" size="lg" variant="secondary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
