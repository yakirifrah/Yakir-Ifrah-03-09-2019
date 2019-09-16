import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./style.scss";
export const CardContinuer = ({ header, temp, text, handleClickCard, locationKey }) => {
  return (
    <>
      {handleClickCard ? (
        <Card className="card-click-able text-center">
          <Card.Header>{header}</Card.Header>
          <Card.Body>
            <Card.Title>
              {temp}&#8451;
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
            <span className="high"> {temp}&#8451;</span>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
