import React from "react";
import "./style.scss";

export default function Title({ name, title }) {
  return (
    <h1 className="text-capitalize font-weight-bold text-title">
      {name}
      <strong className="text-blue"> {title}</strong>
    </h1>
  );
}
