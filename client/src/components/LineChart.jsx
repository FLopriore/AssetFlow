import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs'

function getXData(data) {
  const output = []
  if(!data.detail){
  data.forEach(el => {
    output.push(dayjs((el.date).split('T')[0]))})
    return output
  ;}else return []
}

function getYData(data){
  const output = []
  if(!data.detail){
    data.forEach((el) => {
    output.push(el.close)})
    return output
  }
   else return []
  
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
    />
  );
}
