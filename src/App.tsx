import React from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import Home from './Routes/Home';
import Product from './Routes/Product';
import Payment from './Routes/Payment';
import AddProduct from './Routes/AddProduct';

import { ThemeProvider } from 'styled-components';
import { theme } from './../src/Styles/Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product" component={Product} />
          <Route path="/payment" component={Payment} />
          <Route path="/addProduct" component={AddProduct} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
    </ThemeProvider>
  );
}

export default App;
