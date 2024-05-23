import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavigateBar from '../components/NavigateBar';
import Footer from '../components/footer';

const Main = () => {

    const themeMUI = createTheme({
        palette: {
            primary: {
                light: '#fde68a',
                main: '#facc15',
                dark: '#eab308',
                contrastText: '#d97706',
            },
            secondary: {
                main: "#fff"
            },
            third: {
                main: '#404040'
            }
        },
        spacing: 8,
    });

    return (
        <ThemeProvider theme={themeMUI}>
            <div className='flex flex-col items-center'>
                <Navbar />
                <Outlet />
                <NavigateBar />
            </div>
        </ThemeProvider>
    );
}

export default Main;
