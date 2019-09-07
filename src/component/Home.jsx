import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./SearchBar";
import Main from "./Main";
export default function Home() {
  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col md="auto" xs lg="6">
          <SearchBar />
        </Col>
      </Row>
      <Main />
    </>
  );
}
