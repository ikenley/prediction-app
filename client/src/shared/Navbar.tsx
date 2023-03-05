import React, { useContext } from "react";
import classNames from "classnames";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";

const NavbarMain = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Prediction App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-links">
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/"
            exact={true}
          >
            Predictions
          </NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/about">
            About
          </NavLink>
        </Nav>
        <Nav className="ml-auto">
          <NavItem className={classNames({ "d-none": isLoggedIn })}>
            <LoginButton />
          </NavItem>
          <NavItem className={classNames({ "d-none": !isLoggedIn })}>
            <LogoutButton />
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMain;
