import React, { useContext } from 'react';

import { Grid, Paper, Typography } from '@material-ui/core';

import { GlobalContext } from '../../context/GlobalContext';
import Card from './card';

const Cards = () => {
  const {
    state: {
      globalData: { confirmed, recovered, deaths, lastUpdate },
    },
  } = useContext(GlobalContext);
  const date = new Date(lastUpdate);
  const when =
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  return confirmed ? (
    <Grid
      container
      direction="column"
      style={{
        marginTop: '1em',
        marginBottom: '1em',
      }}
    >
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Card title="Total Cases" text={confirmed.value} color="#0000FF" />
        </Grid>
        <Grid item>
          <Card
            title="Active"
            text={confirmed.value - (recovered.value + deaths.value)}
            color="#FFD700"
          />
        </Grid>
        <Grid item>
          <Card title="Recovered" text={recovered.value} color="#008000" />
        </Grid>
        <Grid item>
          <Card title="Deaths" text={deaths.value} color="#FF0000" />
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ marginTop: '1em' }}>
        <Grid item component={Paper} elevation={1} style={{ padding: '1em' }}>
          <Typography variant="body1" color="secondary">
            {' '}
            Last Update: {when}{' '}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default Cards;
