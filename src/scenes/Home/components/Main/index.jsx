import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestData, toggleFavorite, toggleDegree } from "../../../../store/action/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";
import Title from "../../../common/components/Title";
import { ButtonContainer } from "../../../common/components/Button";
import { ContainerModal as Modal } from "../Modal";
import * as typeSymbol from "../../../../config";
import CardList from "../../../common/components/CardList";
import store from "store";
import ReactLoading from "react-loading";

import "./style.scss";

const Main = id => {
	const dispatch = useDispatch();
	const favoriteCities = store.get("favoriteCities");
	const storeRedux = useSelector(state => state);
	const { error, currentCity, weatherForecastsList, loading, updateCurrentLocation } = storeRedux;

	const nameOfImg = [1.1, 1, 2.0, 2.1, 2, 3, 4, 7, 12, 15, 33, 34, 35];
	const icon = currentCity.icon;
	const degreeSymbolCelsius = currentCity.degreeSymbolCelsius;
	const realIcon = nameOfImg.includes(icon) ? icon : nameOfImg[Math.floor(Math.random() * nameOfImg.length)];

	useEffect(() => {
		if (Object.getOwnPropertyNames(id).length) {
			dispatch(requestData(id.id));
		}
	}, [id]);

	useEffect(() => {
		if (!Object.getOwnPropertyNames(id).length && updateCurrentLocation) {
			dispatch(requestData(currentCity.locationKey));
		}
	}, [currentCity.locationKey]);
	const DEGREE_SYMBOL = degreeSymbolCelsius ? typeSymbol.CELSIUS_SYMBOL : typeSymbol.FAHRENHEIT_SYMBOL;

	return (
		<>
			{loading ? (
				<Container className={`main-container mt-3 p-5`}>
					<Row className="mb-3 justify-content-center">
						<ReactLoading type={"spinningBubbles"} color={"#2c3e50"} height={"20%"} width={"20%"} />
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
								<Col xs={9} md={3} lg={3}>
									<Title name={currentCity.name} />
									<div className="temp">
										<p className="current-weather">current-weather</p>
										<span className="high">
											{" "}
											{currentCity.temp}
											{DEGREE_SYMBOL}
										</span>
									</div>
								</Col>
								<Col xs={12} md={{ span: 3, offset: 5 }} lg={{ span: 3, offset: 5 }} className="padding-fav">
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
								<Col lg={10} xs={10} md={10} className="text-center">
									<Title name={currentCity.text} styleText="springy-text" />
								</Col>
								<Col xs={1} md={1} lg={1}>
									<ButtonContainer
										onClick={() => {
											dispatch(toggleDegree());
										}}
										paddingStyle
									>
										{DEGREE_SYMBOL}
									</ButtonContainer>
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
