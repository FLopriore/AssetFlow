import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function IncomePie() {
  return (
    <PieChart
      colors={['#61C86A', '#81ff7a', '#009b7e', '#9adcbf', '#039655']}
      series={[
        {
          data: [
            { id: 0, value: 10 },
            { id: 1, value: 15 },
            { id: 2, value: 20 },
            { id: 3, value: 4 },
            { id: 4, value: 6 },
          ],
            innerRadius: 87,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -90,
            endAngle: 180,
            cx: 150,
            cy: 150,
        },
      ]}
      width={300}
      height={300}
    />
  );
}

export function ExpensePie() {
    return (
      <PieChart
        colors={['#ff9c83', '#ff0000', '#b71000', '#ff5e00', '#FF5747']}
        series={[
          {
            data: [
              { id: 0, value: 10 },
              { id: 1, value: 15 },
              { id: 2, value: 20 },
              { id: 3, value: 4 },
              { id: 4, value: 6 },
            ],
              innerRadius: 87,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 60,
              endAngle: 330,
              cx: 150,
              cy: 150,
          },
        ]}
        width={300}
        height={300}
      />
    );
  }
  