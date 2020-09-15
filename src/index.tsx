import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux'
import configureStore from "./Redux/Store/configureStore";
import { GlobalStyle } from './Styles/GlobalStyle';

const store = configureStore();
ReactDOM.render(
  <Provider store = {store}>
    <GlobalStyle/>
    <App />
  </Provider>,
  document.getElementById('root')
);


