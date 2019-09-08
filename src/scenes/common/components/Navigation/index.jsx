import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
function Navigation() {
  const items = ["Home", "Favorite"];
  return (
    <Styles>
      {" "}
      <Container fluid>
        {" "}
        <Navbar sticky="top">
          {" "}
          <h5>Herolo Weather Task</h5>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
          <Navbar.Collapse id="basic-navbar-nav">
            {" "}
            <Nav className="ml-auto">
              {" "}
              {items.map((item, index) => {
                return (
                  <Nav.Item key={index}>
                    {" "}
                    <Link to={item === "Home" ? "/" : `/${item}`}>
                      {" "}
                      {item}{" "}
                    </Link>
                  </Nav.Item>
                );
              })}
            </Nav>{" "}
          </Navbar.Collapse>{" "}
        </Navbar>{" "}
      </Container>{" "}
    </Styles>
  );
}

export default Navigation;

const Styles = styled.div`
  .navbar {
    background-color: var(--mainDark);
  }
  .container-fluid {
    padding-right: 0px;
    padding-left: 0px;
  }
  a,
  h5 {
    color: var(--mainWhite) !important;
    font-size: large;
  }
  .nav-item {
    margin-left: 15px;
    margin-right: 15px;
  }
`;
