import React, { useContext } from 'react';

import { Line, Bar } from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalContext';

const Chart = ({ country }) => {
  const {
    state: { dailyData, globalData },
  } = useContext(GlobalContext);

  const LineChart =
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true,
            },
          ],
        }}
      />
    ) : null;
  const barChart = globalData.confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Active', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['#0000FF', '#FFD700', '#008000', '#FF0000'],
            data: [
              globalData.confirmed.value,
              globalData.confirmed.value -
                (globalData.recovered.value + globalData.deaths.value),
              globalData.recovered.value,
              globalData.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return <div style={{ width: '85%' }}>{country ? barChart : LineChart}</div>;
};

export default Chart;
