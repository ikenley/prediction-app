import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

const LogoutButton = () => {
  const authContext = useContext(AuthContext);

  return (
    <Button variant="outline-light" onClick={authContext.logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
