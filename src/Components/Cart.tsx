import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RightArrow } from "./Icons";
import { RootState } from "../Redux/index";
import FatProductCard from "./FatProductCard";
import { RouteComponentProps, withRouter } from "react-router-dom";

const Backgroud = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  right: 0px;
  width: 100%;
  background-color: darkgrey;
  opacity: 0.5;
`;
const Wrapper = styled.div`
  position: fixed;
  width: 500px;
  height: 100%;
  top: 0;
  right: 0;
  background-color: white;
  opacity: 1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Top = styled.div`
  width: 80%;
  display: flex;
  margin-top: 3vh;
  justify-content: space-between;
`;
const Strong = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;
const Line = styled.div`
  width: 80%;
  height: 1px;
  background-color: black;
  margin: 20px 0 auto;
`;
const ProductList = styled.div`
  width: 80%;
  overflow-y: scroll;
  height: 80vh;
`;
const Button = styled.button`
  height: 30px;
  margin-top: 10px;
`;

const ProductCartWraper = styled.div``;
interface Props extends RouteComponentProps {
  toggleCartVisible: () => void;
}

function Cart(props: Props) {
  const { toggleCartVisible } = props;
  //toggleCartVisible 로 카트를 안보이게 할 수 있음
  const cart = useSelector((state: RootState) => state.user.cart);
  const clickBuyBtn = () => {
    toggleCartVisible();
    props.history.push("/orderSheet");
  };
  useEffect(() => {
    document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            width:${100}%;
        `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  return (
    <>
      <Backgroud></Backgroud>
      <Wrapper>
        <Container>
          <Top>
            <Strong>CART</Strong>
            <div onClick={toggleCartVisible}>
              {" "}
              <RightArrow size={47}></RightArrow>
            </div>
          </Top>
          <Line></Line>
          <ProductList>
            {cart &&
              cart.map((product, i) => {
                return (
                  <ProductCartWraper key={i}>
                    <FatProductCard product={product} />
                  </ProductCartWraper>
                );
              })}
          </ProductList>
          <Button onClick={clickBuyBtn}>구매하기</Button>
        </Container>
      </Wrapper>
    </>
  );
}
export default withRouter(Cart);
