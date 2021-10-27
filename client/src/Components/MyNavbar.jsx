import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../Assets/img/logo.png";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            className="d-inline-block align-top"
            id="nav-logo"
          />{" "}
          Elevoversikt
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/Timeplan">Timeplan</Nav.Link>

        </Nav>
      </Container>
    </Navbar>
  );
};
//lols
export default MyNavbar;
