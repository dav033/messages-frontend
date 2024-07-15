import Button from "../Button";
import DialogDescription from "../Dialog/DialogDescription";
import DialogFooter from "../Dialog/DialogFooter";
import DialogHeader from "../Dialog/DialogHeader";
import DialogTitle from "../Dialog/DialogTitle";

interface Props {
  handleClose: () => void;
  handleRegisterUser: () => void;
  handleRegister: () => void;
  handleLogin: () => void;
}

export default function AuthContent(props: Props) {
  const { handleClose, handleRegister, handleRegisterUser, handleLogin } =
    props;
  return (
    <>
      <DialogHeader>
        <DialogTitle>Login to Access Content</DialogTitle>

        <DialogDescription>
          You need to log in or register to access the chat app.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col">
        <Button
          className="mb-2"
          variant="outlined"
          color="black"
          onClick={handleRegisterUser}
        >
          Register whit current user
        </Button>
        <Button
          className="mb-2"
          variant="outlined"
          color="black"
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button variant="outlined" color="black" onClick={handleLogin}>
          Login
        </Button>
      </div>

      <DialogFooter className="justify-center">
        <Button className="mx-auto" onClick={handleClose}>
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
}
