import React from 'react';
import './App.scss';
import './scenes/common/variables.scss';

import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

import Navigation from './scenes/common/components/Navigation';
import Home from './scenes/Home';
import Favorite from './scenes/Favorite';
import NotFound from './scenes/NotFound';
import { ThemeConsumer } from "./context";

function App() {
  return (
    <>
      <ThemeConsumer>
        {value => {
          const { theme } = value;
          return (
            <>
              <Container fluid className={theme}>
                <Navigation />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/favorite" component={Favorite} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </>
          );

        }}
      </ThemeConsumer>
    </>
  );

}

export default App;
