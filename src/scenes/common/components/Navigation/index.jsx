import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./style.scss";
function Navigation() {
  const items = ["Home", "Favorite"];
  return (
    <Container fluid>
      <Navbar sticky="top">
        <h5 className="style-text">Herolo Weather Task</h5>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {items.map((item, index) => {
              return (
                <Nav.Item key={index}>
                  <Link
                    className="stlye-text"
                    to={item === "Home" ? "/" : `/${item}`}
                  >
                    {item}
                  </Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;
