import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./style.scss";
export const CardContiner = ({
  header,
  temp,
  text,
  handleClickCard,
  locationKey
}) => {
  const cardClicked = () => {
    handleClickCard(locationKey);
  };
  return (
    <>
      {handleClickCard ? (
        <Link to={{ pathname: "/", state: { id: locationKey } }}>
          <Card
            className={
              handleClickCard ? "card-click-able text-center" : "text-center"
            }
          >
            <Card.Header>{header}</Card.Header>
            <Card.Body>
              <span className="high"> {temp}&#8451;</span>
            </Card.Body>
            <Card.Footer>
              <strong>{text}</strong>
            </Card.Footer>
          </Card>
        </Link>
      ) : (
        <Card
          className={
            handleClickCard ? "card-click-able text-center" : "text-center"
          }
        >
          <Card.Header>{header}</Card.Header>
          <Card.Body>
            <span className="high"> {temp}&#8451;</span>
          </Card.Body>
          <Card.Footer>
            <strong>{text}</strong>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};
