import React from "react";
import { CardContinuer } from "../Card";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
const CardList = ({ data, msg, history }) => {
	const degreeSymbolCelsius = useSelector(state => state.currentCity.degreeSymbolCelsius);

	const getWeekday = day => {
		var weekday = new Array(7);
		weekday[0] = "Sun";
		weekday[1] = "Mon";
		weekday[2] = "Tue";
		weekday[3] = "Wed";
		weekday[4] = "Thu";
		weekday[5] = "Fri";
		weekday[6] = "Sat";
		return weekday[day.getDay()];
	};

	const getTempC = temp => {
		const tempF = (temp.Minimum.Value + temp.Maximum.Value) / 2;
		if (degreeSymbolCelsius) {
			const tempC = Math.round((5 / 9) * (tempF - 32));
			return tempC;
		}
		return tempF;
	};

	const handleClickCard = id => {
		history.push({
			pathname: "/",
			state: { locationKey: id }
		});
	};
	return (
		<>
			{msg === "weatherForecastsList"
				? data.map((item, index) => {
						return (
							<CardContinuer key={index} header={getWeekday(new Date(item.Date))} temp={getTempC(item.Temperature)} />
						);
				  })
				: data.map((item, index) => {
						return (
							<CardContinuer
								key={index}
								header={item.name}
								temp={item.temp}
								text={item.text}
								handleClickCard={handleClickCard}
								locationKey={item.id}
							/>
						);
				  })}
		</>
	);
};

export default withRouter(CardList);
