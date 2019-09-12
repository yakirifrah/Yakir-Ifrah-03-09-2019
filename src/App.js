import React, { useEffect } from 'react';
import './App.scss';
import './scenes/common/variables.scss';

import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import Navigation from './scenes/common/components/Navigation';
import Home from './scenes/Home';
import Favorite from './scenes/Favorite';
import NotFound from './scenes/NotFound';
import { ProductConsumer } from "./context";

function App() {
  return (
    <>
      <ProductConsumer>
        {value => {
          const { theme } = value;
          if (theme === "night") {
            return (
              <>
                <Container fluid className="night">
                  <Navigation />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/favorite" component={Favorite} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </>
            );
          } else {
            return (
              <>
                <Container fluid className="day">
                  <Navigation />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/favorite" component={Favorite} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
              </>
            );
          }
        }}
      </ProductConsumer>
    </>
  );

}

export default App;
