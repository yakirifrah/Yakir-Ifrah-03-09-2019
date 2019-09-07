import Container from "react-bootstrap/Container";

import React from 'react';
import Navigation from './component/Navigation';
import Home from './component/Home';
import Favorite from './component/Favorite';
import NotFound from './component/NotFound';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { Footer } from './component/Footer';
import { ProductConsumer } from "./context";

function App() {
  return (
    <>
      <ProductConsumer>
        {value => {
          const { theme } = value;
          if (theme === "night") {
            return (
              <Container fluid className="night">
                <Navigation />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/favorite" component={Favorite} />
                  <Route component={NotFound} />
                </Switch>
                <Footer styleFotter="night" />
              </Container>
            );
          } else {
            return (
              <Container fluid className="day">
                <Navigation />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/favorite" component={Favorite} />
                  <Route component={NotFound} />
                </Switch>
                <Footer styleFotter="day" />
              </Container>
            );
          }
        }}
      </ProductConsumer>
    </>
  );

}

export default App;
