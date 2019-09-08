import React from "react";
import { CardContiner } from "../Card";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { requstData } from "../../../../store/action";

import _ from "lodash";

const CardList = ({ data, msg, history }) => {
  const dispatch = useDispatch();

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
    const tempC = Math.round((5 / 9) * (tempF - 32));
    return tempC;
  };

  const handleClickCard = _.debounce(async id => {
    await dispatch(requstData(id));
    history.push("/");
  }, 1000);
  return (
    <>
      {msg === "weatherForecastsList"
        ? data.map((item, index) => {
            return (
              <CardContiner
                key={index}
                header={getWeekday(new Date(item.Date))}
                temp={getTempC(item.Temperature)}
              />
            );
          })
        : data.map((item, index) => {
            return (
              <CardContiner
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
