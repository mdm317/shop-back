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
import baseurl from "./baseurl";
import RedirectBaseurl from "./Components/RedirectBaseurl";

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
                path={`${baseurl}/orderSheet`}
                component={OrderSheet}
                isAuth={user ? true : false}
              />
              <RouterIf
                path={`${baseurl}/chargeCash`}
                component={ChargeCash}
                isAuth={user ? true : false}
              />
              <RouterIf
                path={`${baseurl}/orderList`}
                component={OrderList}
                isAuth={user ? true : false}
              />
              <RouterIf
                path={`${baseurl}/addproduct`}
                component={AddProduct}
                isAuth={user?.isAdmin ? true : false}
              />
              <RouterIf
                path={`${baseurl}/answerform/:qnaId`}
                component={AnswerForm}
                isAuth={user?.isAdmin ? true : false}
              />
              <RouterIf
                path={`${baseurl}/adminPage`}
                component={AdminPage}
                isAuth={user?.isAdmin ? true : false}
              />
              <Route path={`${baseurl}/`} exact component={Home} />
              <Route path={`${baseurl}/login`} component={Login} />
              <Route path={`${baseurl}/signup`} component={SignUp} />
              <Route
                path={`${baseurl}/productDetail/:productIndex`}
                component={ProductDetail}
              />
              <Route path={`${baseurl}/qnaform/:productId`} component={QnaForm} />
              <Route path="*" component={RedirectBaseurl} />
              {/* <Redirect path="*" to={`${baseurl}/`} /> */}
            </Switch>
          </Layout>
        </BrowserRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
}
