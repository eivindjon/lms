import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../Assets/img/logo.png";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            className="d-inline-block align-top"
            id="nav-logo"
          />{" "}
          Fraværsføring 9E
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
//lols
export default MyNavbar;
