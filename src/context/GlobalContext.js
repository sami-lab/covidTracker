import React, { createContext, useReducer } from 'react';
import axios from 'axios'
import * as actionTypes from './actions'
import reducer from './reducer';


const initialState = {
    globalData: [],
    //countryData:{},
    countryList: [],
    dailyData: [],
    loading: true,
    error: false
}
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const url = 'https://covid19.mathdro.id/api';
    function getGlobalData() {
        dispatch({
            type: actionTypes.SET_LOADING,
            payload: true
        })
        axios.get(url).then(data => {
            const { data: { confirmed, recovered, deaths, lastUpdate } } = data;
            dispatch({
                type: actionTypes.GLOBAL_DATA,
                payload: {
                    confirmed,
                    recovered,
                    deaths,
                    lastUpdate
                }
            })
            dispatch({
                type: actionTypes.SET_LOADING,
                payload: false
            })
        }).catch(err => {
            dispatch({
                type: actionTypes.SET_LOADING,
                payload: false
            })
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: err
            })
        });

    }
    function getDailyData() {
        dispatch({
            type: actionTypes.SET_LOADING,
            payload: true
        })
        axios.get(`${url}/daily`).then(data => {
            dispatch({
                type: actionTypes.DAILY_DATA,
                payload: data.data
            })
            dispatch({
                type: actionTypes.SET_LOADING,
                payload: false
            })
        }).catch(err => {
            dispatch({
                type: actionTypes.SET_LOADING,
                payload: false
            })
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: err
            })
        });
    }
    // function getCountryData(countryName){
    //     dispatch({
    //         type: actionTypes.COUNTRY_DATA,
    //     })
    // }
    function getCountryList() {
        const url = '';
        axios.get(url).then(data => {
            dispatch({
                type: actionTypes.COUNTRY_LIST,
                payload: data
            });
            dispatch({
                type: actionTypes.SET_LOADING,
            })
        }).catch(err => {
            dispatch({
                type: actionTypes.SET_LOADING,
            })
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: err
            })
        });

    }

    return (
        <GlobalContext.Provider value={{
            state,
            getGlobalData,
            getCountryList,
            getDailyData
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

