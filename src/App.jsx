import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Main from './pages/mainPage';
import Browse from './pages/browse/browse';
import Catalog from './pages/catalog/catalog';
import Saved from './pages/saved/saved';
import About from './pages/about/about';
import { Provider } from 'react-redux';
import store from '../redux/store';

// Define the Chakra UI theme
const themeChakra = extendTheme({
  colors: {
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006",
    },
  },
});

function App() {
  // Define the routes using React Router
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/browse" replace />} />
      <Route path="/" element={<Main />}>
        <Route path="browse" element={<Browse />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="saved" element={<Saved />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </>
  ));

  return (
    <Provider store={store}>
      <ChakraProvider theme={themeChakra}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
