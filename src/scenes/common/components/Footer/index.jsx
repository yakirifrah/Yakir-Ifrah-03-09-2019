import React from "react";
import Slider from "../Slider";
import './style.scss';
export const Footer = ({ styleFotter }) => (
  <footer className={styleFotter} title="switch theme">
    <label>switch theme</label>
    <Slider />
  </footer>
);
