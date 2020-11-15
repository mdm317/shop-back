import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./Routes/Home";
import AddProduct from "./Routes/AddProduct";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "styled-components";
import { theme } from "./../src/Styles/Theme";
import { GlobalStyle } from "./Styles/GlobalStyle";
import Login from "./Routes/Login";
import SignUp from "./Routes/SignUp";
import ProductDetail from "./Routes/ProductDetail";
import QnaForm from "./Components/Qna/QnaForm";
import AnswerForm from "./Components/AnswerForm";
import Layout from "./Components/Layout";
import OrderSheet from "./Routes/OrderSheet";
import ChargeCash from "./Routes/ChargeCash";
import OrderList from "./Routes/OrderList";
import AdminPage from "./Routes/AdminPage";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/index";
import RouterIf from "./Components/RouterIf";

export default function App() {
  const user = useSelector((state: RootState) => state.user.user);
  //Router 를 RouterIf 로감싸서 인증된 사용자에게만 페이지를 보여주도록 한다.
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Layout>
            <Switch>
              <RouterIf
                path="/orderSheet"
                component={OrderSheet}
                isAuth={user ? true : false}
              />
              <RouterIf
                path="/chargeCash"
                component={ChargeCash}
                isAuth={user ? true : false}
              />
              <RouterIf
                path="/orderList"
                component={OrderList}
                isAuth={user ? true : false}
              />
              <RouterIf
                path="/addproduct"
                component={AddProduct}
                isAuth={user?.isAdmin ? true : false}
              />
              <RouterIf
                path="/answerform/:qnaId"
                component={AnswerForm}
                isAuth={user?.isAdmin ? true : false}
              />
              <RouterIf
                path="/adminPage"
                component={AdminPage}
                isAuth={user?.isAdmin ? true : false}
              />
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route
                path="/productDetail/:productIndex"
                component={ProductDetail}
              />
              <Route path="/qnaform/:productId" component={QnaForm} />
              <Redirect path="*" to="/" />
            </Switch>
          </Layout>
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
}
