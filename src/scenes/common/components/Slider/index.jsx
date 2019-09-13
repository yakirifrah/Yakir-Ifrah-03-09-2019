import React from "react";
import { ThemeConsumer } from "../../../../context";
import "./style.scss";
import Toggle from "react-toggle";
import Dark from "../../../../assets/images/SwitchToggle/dark.png";
import Light from "../../../../assets/images/SwitchToggle/light.png";
const Slider = () => {
  return (
    <label className="switch">
      <ThemeConsumer>
        {({ toggleTheme, theme }) => (
          <Toggle
            onChange={toggleTheme}
            checked={theme === "night"}
            icons={{
              checked: <img src={Light} alt="lignt" className="img-fluid" />,
              unchecked: <img src={Dark} alt="dark" className="img-fluid" />
            }}
          />
        )}
      </ThemeConsumer>
    </label>
  );
};
export default Slider;
