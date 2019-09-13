import React, { useState } from "react";
import './App';


const ThemeContext = React.createContext();

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState("day");

    const toggleTheme = evt => {
        setTheme(evt.target.checked ? "night" : "day")
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme: toggleTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
}
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeProvider, ThemeConsumer, ThemeContext };