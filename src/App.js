import React, { useEffect } from 'react';
import './App.scss';


import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import Navigation from './scenes/common/components/Navigation';
import Home from './scenes/Home';
import Favorite from './scenes/Favorite';
import NotFound from './scenes/NotFound';
import { Footer } from './scenes/common/components/Footer';
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
                <Footer styleFotter="night" />
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
                <Footer styleFotter="day" />
              </>
            );
          }
        }}
      </ProductConsumer>
    </>
  );

}

export default App;
