import axios from 'axios';
import * as actionTypes from './actionTypes';
import store from 'store';


export const requstData = (locatinKey) => {
    const API_KEY = `FTeL9gKM2wNuPkHxiTLuLGgk67jbOSuR`;
    const CURRENT_WEATHER_URL = `dataservice.accuweather.com/currentconditions/v1/${locatinKey}?apikey=${API_KEY}`;
    const WEATHER_FORECASTS_URL = `dataservice.accuweather.com/forecasts/v1/daily/5day/${locatinKey}?apikey=${API_KEY}`;
    return (dispatch, getState) => {
        dispatch(requestPending())
        axios.all([
            axios.get(`https://cors-anywhere.herokuapp.com/${CURRENT_WEATHER_URL}`),
            axios.get(
                `https://cors-anywhere.herokuapp.com/${WEATHER_FORECASTS_URL}`)
        ]).then(axios.spread((currentWeather, forecastsWeather) => {
            const currentTemp = Math.round(currentWeather.data[0].Temperature.Metric.Value);
            const WeatherText = currentWeather.data[0].WeatherText;
            const WeatherIcon = currentWeather.data[0].WeatherIcon;
            const weatherForecastsList = forecastsWeather.data.DailyForecasts;
            const newCurrentCity = getState().currentCity;
            newCurrentCity.temp = currentTemp;
            newCurrentCity.text = WeatherText;
            newCurrentCity.locatinKey = locatinKey;
            newCurrentCity.icon = WeatherIcon
            if (store.get('favoriteCities') !== undefined) {
                if (Object.getOwnPropertyNames(store.get('favoriteCities')).length > 0) {
                    const favoriteCities = store.get('favoriteCities');
                    if (locatinKey in favoriteCities) {
                        newCurrentCity.name = favoriteCities[locatinKey].name;
                        newCurrentCity.isFavorite = true;
                    }

                }
            }

            dispatch(requestSucces(newCurrentCity, weatherForecastsList))
        })).catch(error => {
            console.log(error);

            if (error.response !== undefined) {
                if (error.response.status !== undefined) {
                    const errCode = error.response.status;
                    if (errCode === 404) {
                        dispatch(requestFaild(error.response.data));
                    } if (errCode === 503) {
                        console.log('msg: ', error.response.data.Message);
                        dispatch(requestFaild(error.response.data.Message));
                    }
                    if (errCode === 400) {
                        const err = " Request failed with status code 400";
                        dispatch(requestFaild(err));
                    }
                } else {
                    dispatch(requestFaild(JSON.stringify(error.response.data)));
                }
            }
            else {
                const err = "Network Error"
                dispatch(requestFaild(err));
            }
        });
    }
}


export const requestSucces = (currentCity, weatherForecastsList) => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        currentCity: currentCity,
        weatherForecastsList: weatherForecastsList
    }
}
export const requestSearchSucces = (detailCitiesSerach, tempCities) => {
    return {
        type: actionTypes.REQUEST_AUTOCOMPLETE_SUCCESS,
        detailCitiesSerach: detailCitiesSerach,
        autoCompleteCities: tempCities
    }
}

export const requestPending = () => {
    return {
        type: actionTypes.REQUEST_PENDING
    }
}

export const requestFaild = (error) => {
    return {
        type: actionTypes.REQUEST_FAILD,
        error: error
    }
}

export const toggleFavorite = (currentCity, favoriteCities) => {
    const key = currentCity.locatinKey;
    const isFavorite = currentCity.isFavorite;
    if (favoriteCities !== undefined) {
        const objFavoriteCities = favoriteCities
        if (key in objFavoriteCities) {
            if (!isFavorite) {
                objFavoriteCities[key].temp = currentCity.temp;
                objFavoriteCities[key].text = currentCity.text;
            } else {
                const favoriteCitiesObj = favoriteCities
                delete favoriteCitiesObj[key];
                store.set('favoriteCities', favoriteCitiesObj)
            }
        } else {
            objFavoriteCities[key] = { id: key, name: currentCity.name, temp: currentCity.temp, text: currentCity.text, isFavorite: true };
            store.set('favoriteCities', objFavoriteCities);
        }
    } else {
        const constListFavoriteCities = new Object();
        const firstFavoriteCity = { id: key, name: currentCity.name, temp: currentCity.temp, text: currentCity.text, isFavorite: true };
        constListFavoriteCities[key] = firstFavoriteCity
        console.log('first fav: ', constListFavoriteCities);
        store.set('favoriteCities', constListFavoriteCities);
    }
    return {
        type: actionTypes.TOGGLE_FAVORITE,
        favoriteCities: favoriteCities,
        currentCity: {
            locatinKey: key,
            name: currentCity.name,
            temp: currentCity.temp,
            text: currentCity.text,
            isFavorite: !currentCity.isFavorite,
            icon: currentCity.icon
        }
    }
}




export const setLocationCityKey = (city, currentCity, detailCitiesSerach, favoriteCities) => {
    let item = detailCitiesSerach.find(element => {
        if (element.LocalizedName === city) {
            return element;
        }
    });

    if (favoriteCities !== undefined) {
        if (Object.getOwnPropertyNames(favoriteCities).length > 0 && item.Key in favoriteCities) {
            return {
                type: actionTypes.SET_LOCATION_KEY,
                currentCity: {
                    locatinKey: item.Key,
                    name: city,
                    isFavorite: true,
                    temp: currentCity.temp,
                    text: currentCity.text,
                    icon: currentCity.icon
                }
            }
        } else {
            return {
                type: actionTypes.SET_LOCATION_KEY,
                currentCity: {
                    locatinKey: item.Key,
                    name: city,
                    isFavorite: false,
                    temp: currentCity.temp,
                    text: currentCity.text,
                    icon: currentCity.icon
                }
            }
        }
    }
    else {
        return {
            type: actionTypes.SET_LOCATION_KEY,
            currentCity: {
                locatinKey: item.Key,
                name: city,
                isFavorite: false,
                temp: currentCity.temp,
                text: currentCity.text,
                icon: currentCity.icon
            }
        }
    }
}
export const requestAutocompleteCities = input => {
    const API_KEY = `FTeL9gKM2wNuPkHxiTLuLGgk67jbOSuR`;
    const MY_API_URL = `dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${input}`;
    return dispatch => {
        dispatch(requestPending())
        axios.get(
            `https://cors-anywhere.herokuapp.com/${MY_API_URL}`,
        ).then(res => {
            let detailCitiesSerach = res.data;
            let tempCities = res.data.map(item => item.LocalizedName);
            dispatch(requestSearchSucces(detailCitiesSerach, tempCities));
        }).catch(error => {
            if (error.response) {
                dispatch(requestFaild(error.response.data));
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                dispatch(requestFaild(error.request));
            } else {
                dispatch(requestFaild(error.message));
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
    }
}
