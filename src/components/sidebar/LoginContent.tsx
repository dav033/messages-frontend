import Input from "../FormComponents/Input";
import Button from "../Button";
import DialogFooter from "../Dialog/DialogFooter";
import DialogHeader from "../Dialog/DialogHeader";
import DialogTitle from "../Dialog/DialogTitle";
import BackButton from "./BackButton";

interface Props {
  handleClose: () => void;
  clearStates: () => void;
}

export default function LoginContent(props: Props) {
  const { clearStates, handleClose } = props;
  return (
    <>
      <form className="px-3  bg-blue-">
        <BackButton clearStates={clearStates} />

        <h2 className="mb-5 text-xl mr-auto ml-auto  text-center">Login</h2>

        <div className="w-full">
          <Input label="UserName" type="text" className="w-xl" accent />
          <Input label="Password" type="password" accent />
        </div>
      </form>

      <DialogFooter>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="filled">Login</Button>
      </DialogFooter>
    </>
  );
}
