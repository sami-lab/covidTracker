import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import * as actionTypes from './actions';
import reducer from './reducer';

const initialState = {
  globalData: {},
  //countryData:{},
  countryList: [],
  dailyData: [],
  loading: false,
  error: null,
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const url = 'https://covid19.mathdro.id/api';
  function getGlobalData(country) {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });
    let changeeableUrl = url;
    if (country) {
      changeeableUrl = `${url}/countries/${country}`;
    }
    axios
      .get(changeeableUrl)
      .then((data) => {
        const {
          data: { confirmed, recovered, deaths, lastUpdate },
        } = data;
        dispatch({
          type: actionTypes.GLOBAL_DATA,
          payload: {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
          },
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: err,
        });
      });
  }
  function getDailyData() {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });
    axios
      .get(`${url}/daily`)
      .then(({ data }) => {
        const modifiedData = data.map((dailyData) => ({
          confirmed: dailyData.confirmed.total,
          deaths: dailyData.deaths.total,
          date: dailyData.reportDate,
        }));
        dispatch({
          type: actionTypes.DAILY_DATA,
          payload: modifiedData,
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: err,
        });
      });
  }
  // function getCountryData(countryName){
  //     dispatch({
  //         type: actionTypes.COUNTRY_DATA,
  //     })
  // }
  function getCountryList() {
    dispatch({
      type: actionTypes.SET_LOADING,
      payload: true,
    });
    axios
      .get(`${url}/countries`)
      .then(({ data: { countries } }) => {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: true,
        });
        dispatch({
          type: actionTypes.COUNTRY_LIST,
          payload: countries.map((country) => country.name),
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.SET_LOADING,
          payload: false,
        });
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: err,
        });
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        getGlobalData,
        getCountryList,
        getDailyData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
