import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import AuthRoute from "./components/AuthRoute.jsx";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#009b7e',
        },
        secondary: {
            main: '#FF5747',
        },
        savings: {
            main: '#FFC300'
        }
    },
    components: {
        MuiCssBaseline: {
          styleOverrides: () => ({
            '&::-webkit-scrollbar': {
                display: 'none'
              },
          }),
        },
      },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthRoute/>
        </ThemeProvider>
    </React.StrictMode>,
)