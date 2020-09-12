import React, { useContext, useEffect } from 'react';
import {Backdrop,Button,CircularProgress,Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText,useMediaQuery} from '@material-ui/core'
import { useTheme, makeStyles  } from '@material-ui/core/styles';

import Chart from './components/Charts/charts'
import CountryList from './components/CountryList/countryList'

import {GlobalProvider, GlobalContext } from './context/GlobalContext'


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Main() {
  const classes = useStyles();
  const { state ,getGlobalData,getDailyData} = useContext(GlobalContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(()=>{
    getGlobalData();
  },[]);
  const error =(
    <Dialog
    fullScreen={fullScreen}
    open={state.error}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle>Error</DialogTitle>
    <DialogContent>
      <DialogContentText>
         {state.error}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={()=>window.location.reload(false)} color="primary">
        Reload
      </Button>
    </DialogActions>
  </Dialog>
  )
  return (
    state.error ? error:
      state.loading ? <Backdrop className={classes.backdrop} open={state.loading}>
        <CircularProgress color="inherit" />
      </Backdrop> :
        <div>
          {console.log(state)}
          <CountryList />
          <Chart />
        </div>
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
