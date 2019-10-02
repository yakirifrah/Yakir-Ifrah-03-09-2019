import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as typeSymbol from "../../../../config";

import "./style.scss";
export const CardContinuer = ({ header, temp, text, handleClickCard, locationKey }) => {
	const degreeSymbolCelsius = useSelector(state => state.currentCity.degreeSymbolCelsius);
	const DEGREE_SYMBOL = degreeSymbolCelsius ? typeSymbol.CELSIUS_SYMBOL : typeSymbol.FAHRENHEIT_SYMBOL;

	return (
		<>
			{handleClickCard ? (
				<Card className="card-click-able text-center">
					<Card.Header>{header}</Card.Header>
					<Card.Body>
						<Card.Title>
							{temp}
							{typeSymbol.CELSIUS_SYMBOL}
							<br />
							<span className="mb-2 text-muted">{text}</span>
						</Card.Title>
						<br />
					</Card.Body>
					<Card.Footer>
						<Link to={{ pathname: "/", state: { id: locationKey } }}>detail</Link>
					</Card.Footer>
				</Card>
			) : (
				<Card className="text-center animated fadeInUp">
					<Card.Header>{header}</Card.Header>
					<Card.Body>
						<span className="high">
							{" "}
							{temp}
							{DEGREE_SYMBOL}
						</span>
					</Card.Body>
				</Card>
			)}
		</>
	);
};
