import Input from "../FormComponents/Input";
import Button from "../Button";
import DialogFooter from "../Dialog/DialogFooter";
import DialogHeader from "../Dialog/DialogHeader";
import DialogTitle from "../Dialog/DialogTitle";
import BackButton from "./BackButton";
import { useUser } from "@/providers/UserContext";

interface Props {
  handleClose: () => void;
  clearStates: () => void;
}

export default function RegisterUserContent(props: Props) {
  const { handleClose, clearStates } = props;
  const { user } = useUser();
  return (
    <>
      <form className="px-3  bg-blue-">
        <BackButton clearStates={clearStates} />

        <h2 className="mb-5 text-xl mr-auto ml-auto  text-center">
          Register User
        </h2>

        <div className="w-full">
          <Input
            label="UserName"
            type="text"
            className="w-xl"
            accent
            defaultValue={user.name}
          />
          <Input label="Password" type="password" accent />
          <Input label="Confirm Password" type="password" accent />
        </div>
      </form>

      <DialogFooter>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="filled">Register</Button>
      </DialogFooter>
    </>
  );
}
