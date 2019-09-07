import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Container from "react-bootstrap/Container";
import Title from "./Title";
import { useSelector } from "react-redux";

import CardList from "./CardList";
export default function Favorite() {
  const listFavoriteCities = useSelector(state => state.favoriteCities);
  return (
    <>
      <Row className="text-center mt-3">
        <Col xs={12} md={12} lg={12}>
          <Title name="Favorite" title="cities" />
        </Col>
      </Row>
      {Object.getOwnPropertyNames(listFavoriteCities).length === 0 ? (
        <Row className="text-center mt-5">
          <Col xs={12} md={12} lg={12}>
            <Title name="Favorite cities" title="empty" />
          </Col>
        </Row>
      ) : (
        <Container className="fav-section text-center">
          <CardDeck className="pt-5 justify-content-center">
            <CardList
              data={Object.values(listFavoriteCities)}
              msg="listFavoriteCities"
            />
          </CardDeck>
        </Container>
      )}
    </>
  );
}
