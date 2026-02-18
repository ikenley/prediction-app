import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";

const LoginButton = () => {
  const authContext = useContext(AuthContext);

  return (
    <Button variant="outline-light" onClick={authContext.login}>
      Login
    </Button>
  );
};

export default LoginButton;
