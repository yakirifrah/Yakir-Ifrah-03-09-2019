import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    weatherForecastsList: [],
    error: null,
    loading: false,
    autoCompleteCities: [],
    detailCitiesSearch: [],
    currentCity: {
        locationKey: '215854',
        name: 'tel aviv',
        temp: null,
        text: null,
        isFavorite: false,
        icon: 34
    },
}
const requestPending = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true,
    })
}

const requestSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        weatherForecastsList: action.weatherForecastsList,
        currentCity: action.currentCity

    })
}

const requestFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}


const requestAutocompleteSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        detailCitiesSearch: action.detailCitiesSearch,
        autoCompleteCities: action.autoCompleteCities
    });
}

const toggleFavorite = (state, action) => {
    return updateObject(state, {
        currentCity: action.currentCity,
    })
}

const setLocationKey = (state, action) => {
    return updateObject(state, {
        currentCity: action.currentCity,
    })
}





export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_PENDING: return requestPending(state, action);
        case actionTypes.REQUEST_SUCCESS: return requestSuccess(state, action);
        case actionTypes.REQUEST_FAILED: return requestFailed(state, action);
        case actionTypes.REQUEST_AUTOCOMPLETE_SUCCESS: return requestAutocompleteSuccess(state, action);
        case actionTypes.TOGGLE_FAVORITE: return toggleFavorite(state, action);
        case actionTypes.SET_LOCATION_KEY: return setLocationKey(state, action);

        default:
            return state;
    }

}