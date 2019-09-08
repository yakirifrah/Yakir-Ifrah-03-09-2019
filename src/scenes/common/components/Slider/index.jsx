import React from "react";

import { ProductConsumer } from "../../../../context";
import "./style.scss";
class Slider extends React.Component {
  render() {
    return (
      <label className="switch">
        <ProductConsumer>
          {({ toggleTheme, theme }) => (
            <input
              onChange={toggleTheme}
              type="checkbox"
              checked={theme === "night"}
            />
          )}
        </ProductConsumer>
        <span className="slider round" />
      </label>
    );
  }
}

export default Slider;
