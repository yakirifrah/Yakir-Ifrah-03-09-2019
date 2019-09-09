import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
export default function Home() {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={10} xs={8} lg={6}>
          <SearchBar />
        </Col>
      </Row>
      <Main />
    </>
  );
}
