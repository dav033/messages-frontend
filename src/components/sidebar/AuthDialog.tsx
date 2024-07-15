import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import AuthContent from "./AuthContent";
import RegisterContent from "./RegisterContent";
import RegisterUserContent from "./RegisterUserContent";
import LoginContent from "./LoginContent";

interface Props {
  open: boolean;
  handleClose: () => void;
}

type ContentType = "auth" | "register" | "registerUser" | "login";

export default function AuthDialog(props: Props) {
  const { open, handleClose } = props;
  const [contentType, setContentType] = useState<ContentType>("auth");

  const handleContentChange = (type: ContentType) => {
    setContentType(type);
  };

  const clearStates = () => {
    setContentType("auth");
  };

  const onClose = () => {
    clearStates();
    handleClose();
  };

  const contentMap = {
    registerUser: (
      <RegisterUserContent handleClose={onClose} clearStates={clearStates} />
    ),
    register: (
      <RegisterContent handleClose={onClose} clearStates={clearStates} />
    ),
    login: <LoginContent handleClose={onClose} clearStates={clearStates} />,
    auth: (
      <AuthContent
        handleClose={onClose}
        handleRegisterUser={() => handleContentChange("registerUser")}
        handleRegister={() => handleContentChange("register")}
        handleLogin={() => handleContentChange("login")}
      />
    ),
  };

  return (
    <Dialog open={open} onClose={onClose} className="text-black max-w-lg">
      {contentMap[contentType]}
    </Dialog>
  );
}
