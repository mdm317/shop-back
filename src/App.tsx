import React from 'react';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom';
import Home from './Routes/Home';
import AddProduct from './Routes/AddProduct';

import {ToastContainer, toast}from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from 'styled-components';
import { theme } from './../src/Styles/Theme';
import { GlobalStyle } from './Styles/GlobalStyle';
import Login from './Routes/Login';
import SignUp from './Routes/SignUp';
import ProductDetail from './Routes/ProductDetail';
import QnaForm from './Components/Qna/QnaForm';
import AnswerForm from './Components/AnswerForm';
import Layout from './Components/Layout';
import OrderSheet from './Routes/OrderSheet';
import AddressSearchModal from './Components/Address/AddressSearchModal';
import ChargeCash from './Routes/ChargeCash';
import OrderList from './Routes/OrderList';
import AddReviewForm from './Components/Modal/AddReviewForm';
import AdminPage from './Routes/AdminPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <>
      <GlobalStyle/>
      <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addproduct" component={AddProduct} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/productDetail/:productIndex" component={ProductDetail} />
          <Route path="/qnaform/:productId" component={QnaForm} />
          <Route path="/answerform/:qnaId" component={AnswerForm} />
          <Route path="/orderSheet" component={OrderSheet} />
          <Route path="/chargeCash" component={ChargeCash} />
          <Route path="/orderList" component={OrderList} />
          <Route path="/adminPage" component={AdminPage} />
          <Redirect path="*" to="/" />
        </Switch>
      </Layout>
      </BrowserRouter>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
    </ThemeProvider>
  );
}

export default App;
