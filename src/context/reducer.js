import * as actionTypes from './actions'

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.GLOBAL_DATA:
            return {
                ...state,
                globalData: action.payload
            }
        case actionTypes.DAILY_DATA:
            return {
                ...state,
                dailyData: action.payload
            }
        case actionTypes.COUNTRY_LIST:
            return {
                ...state,
                countryList: action.payload
            }
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default reducer;