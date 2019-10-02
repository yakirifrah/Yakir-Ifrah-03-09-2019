import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import Navigation from './scenes/common/components/Navigation';
import Home from './scenes/Home';
import Favorite from './scenes/Favorite';
import NotFound from './scenes/NotFound';
import { ThemeConsumer } from "./context";
import { locationUpdate } from './store/action';
import axios from "axios";


import './App.scss';
import './scenes/common/variables.scss';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if ("geolocation" in navigator) {
      const success = async (position) => {
        const { latitude } = await position.coords;
        const { longitude } = await position.coords;
        const API_KEY = `iAMzJxW63zxiBwJ9PDghyrOmQVJiqGvB`;
        const GEO_LOCATION_URL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude}%2C${longitude}`;
        const FINAL_URL = `https://cors-anywhere.herokuapp.com/${GEO_LOCATION_URL}`;
        axios.get(FINAL_URL)
          .then(response => {
            if (response.statusText !== 'OK') {
              throw Error(response.statusText);
            }
            const { data } = response;
            console.log(data);

            const EnglishName = data.EnglishName;
            const { Key } = data;
            dispatch(locationUpdate(EnglishName, Key));

          })
          .catch(error => {
            console.error(error)
            dispatch(locationUpdate('tel aviv', '215854'));

          })
      };

      const error = () => {
        dispatch(locationUpdate('tel aviv', '215854'));

      };

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      dispatch(locationUpdate('tel aviv', '215854'));
    };
  })




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
