import { useUser } from "@/providers/UserContext";
import Button from "../Button";
import DialogFooter from "../Dialog/DialogFooter";
import Input from "../FormComponents/Input";
import BackButton from "./BackButton";
import { register } from "@/petitions";
import { useState } from "react";

interface Props {
  handleClose: () => void;
  clearStates: () => void;
}

export default function RegisterContent(props: Props) {
  const { clearStates, handleClose } = props;
  const { initNewUser } = useUser();
  const [isloading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const name = e.target.name.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value;

      console.log(name, password, confirmPassword);

      if (password !== confirmPassword) {
        alert("passwords do not match");
        return;
      }
      const rest = await register(name, password);
      initNewUser(rest);
      setIsLoading(false);
    } catch (error) {
      alert("error");
    }
  };
  return (
    <>
      <form className="px-3  bg-blue-" onSubmit={handleRegister}>
        <BackButton clearStates={clearStates} />

        <h2 className="mb-5 text-xl mr-auto ml-auto  text-center">Register</h2>
        <h1 className="text-black">{isloading.toString()}</h1>


        <div className="w-full">
          <Input
            label="UserName"
            type="text"
            className="w-xl"
            accent
            id="name"
            required
          />
          <Input
            label="Password"
            type="password"
            accent
            id="password"
            required
          />
          <Input
            required
            label="Confirm Password"
            type="password"
            accent
            id="confirmPassword"
          />
        </div>

        <DialogFooter>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="filled" type="submit">
            Register
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
