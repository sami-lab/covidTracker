import React, { useContext } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { GlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '30em',
    margin: 0,
    [theme.breakpoints.down('md')]: {
      width: '15em',
    },
  },
}));
const Countries = (props) => {
  const classes = useStyles();
  const {
    state: { countryList },
  } = useContext(GlobalContext);
  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        defaultValue={props.country}
        onChange={(e) => props.handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {countryList.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;
