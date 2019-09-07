import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requstData, toggleFavorite } from "../store/action";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Title from "./Title";
import { ButtonContainer } from "./Button";
import { ContainerModal as Modal } from "./Modal";
import CardList from "./CardList";

const Main = () => {
  const error = useSelector(state => state.error);
  const currentCity = useSelector(state => state.currentCity);
  const favoriteCities = useSelector(state => state.favoriteCities);
  const weatherForecastsList = useSelector(state => state.weatherForecastsList);
  const dispatch = useDispatch();

  var nameOfImg = [1.1, 1, 2.0, 2.1, 2, 3, 4, 7, 12, 15, 33, 34, 35];
  const icon = useSelector(state => state.currentCity.icon);
  const realIcon = nameOfImg.includes(icon)
    ? icon
    : nameOfImg[Math.floor(Math.random() * nameOfImg.length)];

  useEffect(() => dispatch(requstData(currentCity.locatinKey)), [
    currentCity.locatinKey
  ]);
  return (
    <>
      {!error ? (
        <Container className="main-container mt-4 p-5">
          <Row className="mb-3">
            <Col xs={3} md={1} lg={1}>
              <div className="current-weather-city">
                <img
                  src={require(`../assets/images/weathericons/${realIcon}.svg`)}
                  alt="img"
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col xs={3} md={3}>
              <Title name={currentCity.name} />
              <div className="temp">
                <p className="current-weather">current-weather</p>
                <span className="high"> {currentCity.temp}&#8451;</span>
              </div>
            </Col>
            <Col md={{ span: 3, offset: 5 }} className="padding-fav">
              <div className="d-flex justify-content-center align-items-center">
                <i
                  className={
                    currentCity.isFavorite
                      ? "fas fa-heart fa-3x"
                      : "far fa-heart fa-3x"
                  }
                />
                <ButtonContainer
                  onClick={() => {
                    dispatch(toggleFavorite(currentCity, favoriteCities));
                  }}
                >
                  Add to favorite
                </ButtonContainer>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Title name={currentCity.text} />
          </Row>
          <CardDeck className="pt-5 justify-content-center">
            <CardList data={weatherForecastsList} msg="weatherForecastsList" />
          </CardDeck>
        </Container>
      ) : (
        <Container className="text-center mt-5 p-4">
          <Modal title="error" msg={error} />
        </Container>
      )}
    </>
  );
};

export default React.memo(Main);
