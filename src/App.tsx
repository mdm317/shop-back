import React from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import Home from './Routes/Home';
import Product from './Routes/Troduct';
import Payment from './Routes/Tayment';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product" component={Product} />
        <Route path="/payment" component={Payment} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
