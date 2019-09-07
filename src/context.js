import React, { Component } from "react";
import './App';


const ProductContext = React.createContext();

//to do: save the cart in the local storage , when the user refresh the page all cart are saved
class Tprovider extends Component {

    state = {
        theme: "day",
        toggleTheme: this.toggleTheme
    };

    toggleTheme = evt => {
        this.setState({ theme: evt.target.checked ? "night" : "day" });
    };

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    toggleTheme: this.toggleTheme

                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}
const ProductConsumer = ProductContext.Consumer;

export { Tprovider, ProductConsumer };