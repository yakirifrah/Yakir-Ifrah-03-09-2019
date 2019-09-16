import axios from 'axios';
import * as actionTypes from './actionTypes';
import store from 'store';


export const requestData = (locationKey) => {
    const API_KEY = `FTeL9gKM2wNuPkHxiTLuLGgk67jbOSuR`;
    const CURRENT_WEATHER_URL = `dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`;
    const WEATHER_FORECASTS_URL = `dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`;
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
            newCurrentCity.locationKey = locationKey;
            newCurrentCity.icon = WeatherIcon
            if (store.get('favoriteCities') !== undefined) {
                if (Object.getOwnPropertyNames(store.get('favoriteCities')).length) {
                    const favoriteCities = store.get('favoriteCities'); // get local storage with key=> favoriteCities
                    if (locationKey in favoriteCities) {
                        newCurrentCity.name = favoriteCities[locationKey].name;
                        newCurrentCity.isFavorite = true;
                    }
                }
            }
            dispatch(requestSuccess(newCurrentCity, weatherForecastsList))
        })).catch(error => {
            console.log(error);
            if (error.response !== undefined) {
                if (error.response.status !== undefined) {
                    const errCode = error.response.status;
                    if (errCode === 404) {
                        dispatch(requestFailed(error.response.data));
                    } else if (errCode === 503) {
                        console.log('msg: ', error.response.data.Message);
                        dispatch(requestFailed(error.response.data.Message));
                    } else if (errCode === 400) {
                        const err = " Request failed with status code 400";
                        dispatch(requestFailed(err));
                    } else {
                        const err = `Request failed with status code 400 ${errCode}`;
                        dispatch(requestFailed(err));
                    }
                } else {
                    dispatch(requestFailed(JSON.stringify(error.response.data)));
                }
            }
            else {
                const err = "Network Error"
                dispatch(requestFailed(err));
            }
        });
    }
}


export const requestSuccess = (newCurrentCity, weatherForecastsList) => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        currentCity: newCurrentCity,
        weatherForecastsList: weatherForecastsList
    }
}
export const requestSearchSuccess = (detailCitiesSearch, tempCities) => {
    return {
        type: actionTypes.REQUEST_AUTOCOMPLETE_SUCCESS,
        detailCitiesSearch: detailCitiesSearch,
        autoCompleteCities: tempCities
    }
}

export const requestPending = () => {
    return {
        type: actionTypes.REQUEST_PENDING
    }
}

export const requestFailed = (error) => {
    return {
        type: actionTypes.REQUEST_FAILED,
        error: error
    }
}

export const toggleFavorite = (currentCity, favoriteCities) => {
    const key = currentCity.locationKey;
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
        store.set('favoriteCities', constListFavoriteCities);
    }
    return {
        type: actionTypes.TOGGLE_FAVORITE,
        favoriteCities: favoriteCities,
        currentCity: {
            locationKey: key,
            name: currentCity.name,
            temp: currentCity.temp,
            text: currentCity.text,
            isFavorite: !currentCity.isFavorite,
            icon: currentCity.icon
        }
    }
}




export const setLocationCityKey = (city, currentCity, detailCitiesSearch, favoriteCities) => {
    let item = detailCitiesSearch.find(element => {
        if (element.LocalizedName === city) {
            return element;
        }
    });

    if (favoriteCities !== undefined) {
        if (Object.getOwnPropertyNames(favoriteCities).length && item.Key in favoriteCities) {
            return {
                type: actionTypes.SET_LOCATION_KEY,
                currentCity: {
                    locationKey: item.Key,
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
                    locationKey: item.Key,
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
                locationKey: item.Key,
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
            let detailCitiesSearch = res.data;
            let tempCities = res.data.map(item => item.LocalizedName);
            dispatch(requestSearchSuccess(detailCitiesSearch, tempCities));
        }).catch(error => {
            console.log(error);
            if (error.response !== undefined) {
                if (error.response.status !== undefined) {
                    const errCode = error.response.status;
                    if (errCode === 404) {
                        dispatch(requestFailed(error.response.data));
                    } else if (errCode === 503) {
                        console.log('msg: ', error.response.data.Message);
                        dispatch(requestFailed(error.response.data.Message));
                    } else if (errCode === 400) {
                        const err = " Request failed with status code 400";
                        dispatch(requestFailed(err));
                    } else {
                        const err = `Request failed with status code 400 ${errCode}`;
                        dispatch(requestFailed(err));
                    }
                } else {
                    dispatch(requestFailed(JSON.stringify(error.response.data)));
                }
            }
            else {
                const err = "Network Error"
                dispatch(requestFailed(err));
            }
        });
    }
}
