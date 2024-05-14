import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#eeeeee',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#FFC300',
    },
  }));

BorderLinearProgress.propTypes = {
    value: PropTypes.number.isRequired,
};

export default function SavingsProgress({value}) {
    return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 1 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" value={value}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
    );
}