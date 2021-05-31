import React, { useCallback } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type Props = {
  launchTour?: () => void;
};

const NavbarMain = ({ launchTour }: Props) => {
  const handleTourClick = useCallback(() => {
    if (launchTour) {
      launchTour();
    }
  }, [launchTour]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Prediction App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto nav-links">
          {/* <NavLink
            className="nav-link nav-intro"
            activeClassName="active"
            to="/foo"
          >
            Foo
          </NavLink>
          <NavLink
            className="nav-link nav-overview"
            activeClassName="active"
            to="/"
            exact={true}
          >
            Overview
          </NavLink> */}
        </Nav>
        {/* <Nav className="ml-auto">
          <NavDropdown
            title={<span>Resources</span>}
            id="navbar-context-menu"
            className="navbar-context-menu"
            alignRight
          >
            {launchTour ? (
              <NavDropdown.Item onClick={handleTourClick}>
                Walkthrough
              </NavDropdown.Item>
            ) : null}
            <NavDropdown.Item target="_blank" href="/faq.pdf">
              FAQ
            </NavDropdown.Item>
            <NavDropdown.Item href="mailto:todo@todo.com">
              Contact Us
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item target="_blank" href="https://www.google.com">
              Foo
            </NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMain;
