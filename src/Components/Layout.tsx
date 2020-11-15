import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/index";
import { getProfile } from "../Redux/User/thunk";
import Header from "./Header";
import { getProducts } from "../Redux/Product/thunk";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  display: block;
  max-width: 960px;
`;

const Footer = styled.div`
  height: 300px;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) {
    dispatch(getProfile());
  }
  dispatch(getProducts());

  return (
    <Wrapper>
      <Container>
        <Header></Header>
        {children}
      </Container>
      <Footer />
    </Wrapper>
  );
}
