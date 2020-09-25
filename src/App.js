import React, { useContext, useEffect, useState } from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  Grid,
} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';

import Cards from './components/Cards/cards';
import Chart from './components/Charts/charts';
import CountryList from './components/CountryList/countryList';

import { GlobalProvider, GlobalContext } from './context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Main() {
  const classes = useStyles();
  const [country, setCountry] = useState(null);
  const { state, getGlobalData, getDailyData, getCountryList } = useContext(
    GlobalContext
  );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = () => {
      getGlobalData();
      getDailyData();
      getCountryList();
    };
    fetchData();
  }, []);
  const handleCountryChange = (country) => {
    getGlobalData(country);
    setCountry(country);
  };
  const error = (
    <Dialog
      fullScreen={fullScreen}
      open={state.error}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle align="center">Error</DialogTitle>
      <DialogContent>
        <DialogContentText align="center">
          {state.error?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          align="center"
          onClick={() => window.location.reload(false)}
          color="primary"
        >
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
  return state.error !== null ? (
    error
  ) : state.loading ? (
    <Backdrop className={classes.backdrop} open={state.loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ marginTop: '1em', marginBottom: '1em', maxWidth: '100%' }}
    >
      <Grid item>
        <Cards />
      </Grid>
      <Grid item container justify="center">
        <CountryList
          country={country}
          handleCountryChange={handleCountryChange}
        />
      </Grid>
      <Grid item container justify="center">
        <Chart country={country} s />
      </Grid>
      {console.log(state)}
    </Grid>
  );
}

function App() {
  return (
    <div>
      <GlobalProvider>
        <Main />
      </GlobalProvider>
    </div>
  );
}

export default App;
