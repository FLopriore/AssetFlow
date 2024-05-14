import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs'

function getXData(data) {
  const output = []
  data.forEach(el => {
    output.push(dayjs((el.date).split('T')[0]))
  });
  return output
}

function getYData(data){
  const output = []
  data.forEach(el => {
    output.push(el.close)
  });
  return output
}

export default function BasicLineChart({histData}) {
  const xData = getXData(histData);
  const yData = getYData(histData);

  return (
    <LineChart
      xAxis={[{ 
        data: xData,
        scaleType: 'time',
       }]}
      series={[
        {
          curve: 'linear',  
          data: yData,
        },
      ]}
      width={600}
      height={500}
    />
  );
}
