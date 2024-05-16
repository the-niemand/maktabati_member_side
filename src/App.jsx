import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import Auth from './pages/auth';
import { Routes, Route } from 'react-router-dom';
import createStore from 'react-auth-kit/createStore';


function App() {
  const colors = {
    brand: {
      400: '#ECC94B'
    }
  };

  const theme = extendTheme({
    colors
  });

  return (
    <ChakraProvider theme={theme}>

          <Routes>
            <Route path="/Auth" element={<Auth />} /> {/* Use element={<Auth />} */}
          </Routes>

    </ChakraProvider>
  );
}

export default App;
