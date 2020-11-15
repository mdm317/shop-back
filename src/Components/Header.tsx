import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  CartIcon,
  Logo,
  Login,
  Add,
  Out,
  AddUser,
  UserProfile,
  Setting,
} from "./Icons";
import { RootState } from "../Redux/index";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { useState } from "react";
import Cart from "./Cart";
import { logOut } from "../Redux/User/thunk";

const Wrapper = styled.div`
  background-color: white;
  width: 100%;
`;

const Container = styled.div`
  margin: 0 auto;

  max-width: 960px;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Item = styled.div`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;
const LeftContent = styled.div`
  display: flex;
`;
const RightContent = styled.div`
  display: flex;
`;

type Props = RouteComponentProps;
function Header(props: Props) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const [cartVisible, setcartVisible] = useState(false);
  const clickCart = () => {
    toggleCartVisible();
    //Cart 아이콘을 누르면 Cart가 보이게함
  };
  const toggleCartVisible = () => {
    setcartVisible(!cartVisible);
  };
  const clickOut = () => {
    dispatch(logOut(props));
  };

  return (
    <>
      <Wrapper>
        <Container>
          <LeftContent>
            <Link to="/">
              <Logo></Logo>
            </Link>
          </LeftContent>
          <RightContent>
            {user && !user.isAdmin && (
              <Link to="/orderList">
                <Item>
                  <UserProfile />
                </Item>
              </Link>
            )}
            {user && user.isAdmin && (
              <Item>
                <Link to="/adminPage">
                  <Setting></Setting>
                </Link>
              </Item>
            )}
            {user && user.isAdmin && (
              <Item>
                <Link to="/addproduct">
                  <Add size={30}></Add>
                </Link>
              </Item>
            )}
            {user && (
              <>
                <Item onClick={clickCart}>
                  <CartIcon size={30}></CartIcon>
                </Item>
                <Item onClick={clickOut}>
                  <Out size={30}></Out>
                </Item>
              </>
            )}
            {!user && (
              <>
                <Item>
                  <Link to="/signup">
                    <AddUser size={30}></AddUser>
                  </Link>
                </Item>
                <Item>
                  <Link to="/login">
                    <Login size={30}></Login>
                  </Link>
                </Item>
              </>
            )}
          </RightContent>
        </Container>
        {user && <div>안녕하세요 {user.name}님</div>}
      </Wrapper>
      {cartVisible && <Cart toggleCartVisible={toggleCartVisible} />}
    </>
  );
}
export default withRouter(Header);
