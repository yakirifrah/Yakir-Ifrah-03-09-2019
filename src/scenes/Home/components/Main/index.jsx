import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestData, toggleFavorite } from "../../../../store/action/index";
import store from "store";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Title from "../../../common/components/Title";
import { ButtonContainer } from "../../../common/components/Button";
import { ContainerModal as Modal } from "../Modal";

import CardList from "../../../common/components/CardList";
import Loader from "react-loader-spinner";
import "./style.scss";

const Main = id => {
  const error = useSelector(state => state.error);
  const currentCity = useSelector(state => state.currentCity);
  const favoriteCities = store.get("favoriteCities");
  const weatherForecastsList = useSelector(state => state.weatherForecastsList);
  const dispatch = useDispatch();
  var nameOfImg = [1.1, 1, 2.0, 2.1, 2, 3, 4, 7, 12, 15, 33, 34, 35];
  const icon = useSelector(state => state.currentCity.icon);
  const realIcon = nameOfImg.includes(icon) ? icon : nameOfImg[Math.floor(Math.random() * nameOfImg.length)];

  useEffect(() => {
    if (Object.getOwnPropertyNames(id).length) {
      dispatch(requestData(id.id));
    }
  }, [id]);

  useEffect(() => {
    if (!Object.getOwnPropertyNames(id).length) {
      dispatch(requestData(currentCity.locationKey));
    }
  }, [currentCity.locationKey]);

  return (
    <>
      {useSelector(state => state.loading) ? (
        <Container className={`main-container mt-3 p-5`}>
          <Row className="mb-3 justify-content-center">
            <Loader
              type="CradleLoader"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </Row>
        </Container>
      ) : (
        <>
          {!error ? (
            <Container className={`main-container mt-3 p-5`}>
              <Row className="mb-3">
                <Col xs={3} md={1} lg={1}>
                  <img
                    src={require(`../../../../assets/images/weathericons/${realIcon}.svg`)}
                    alt="img"
                    className="img-fluid"
                  />
                </Col>
                <Col xs={1} md={3} lg={3}>
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
                        currentCity.isFavorite ? "fas fa-heart fa-3x animated heartBeat" : "far fa-heart fa-3x"
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
                <Col lg={12} xs={12} md={12} className="text-center">
                  <Title name={currentCity.text} styleText="springy-text" />
                </Col>
              </Row>
              <CardDeck className="pt-5 justify-content-center">
                <CardList data={weatherForecastsList} msg="weatherForecastsList" />
              </CardDeck>
            </Container>
          ) : (
            <Container className="text-center">
              <Modal title="error" msg={error} />
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Main);
