import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const Main = () => {

     const themeMUI = createTheme({
          spacing: 8,
     });

     return (
          <ThemeProvider theme={themeMUI}>
               < div className='flex flex-col' >
                    <Navbar />
                    <Outlet />
               </ div>
          </ThemeProvider>
     )
}

export default Main