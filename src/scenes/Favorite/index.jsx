import React from "react";
import { useSelector } from "react-redux";
import store from "store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

import Title from "../common/components/Title";
import CardList from "../common/components/CardList";

import "./style.scss";
export default function Favorite() {
  const listFavoriteCities = store.get("favoriteCities");
  return (
    <>
      <Row className="text-center mt-3">
        <Col xs={12} md={12} lg={12}>
          <Title name="Favorite" title="cities" />
        </Col>
      </Row>
      {(listFavoriteCities !== undefined &&
        Object.getOwnPropertyNames(listFavoriteCities).length === 0) ||
      listFavoriteCities === undefined ? (
        <Row className="text-center mt-5">
          <Col xs={12} md={12} lg={12}>
            <Title title="empty" />
          </Col>
        </Row>
      ) : (
        <Row className="fav-section justify-content-center">
          <CardDeck className="pt-5 text-center">
            <CardList
              data={Object.values(listFavoriteCities)}
              msg="listFavoriteCities"
            />
          </CardDeck>
        </Row>
      )}
    </>
  );
}
