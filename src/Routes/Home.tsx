import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ProductCard from "../Components/ProductCard";
import { getProducts } from "../Redux/Product/thunk";
import { Product } from "../Model/db";
import { RootState } from "../Redux/index";

const ProductCardContainer = styled.div`
  width: 300px;
`;
const Container = styled.div``;
const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Text = styled.p`
  margin-top: 20px;
`;

//렌더링시에 서버에서 제품목록을 가져와서 보여준다
export default function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state: RootState) => state.product.products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Container>
      <Text>제품들</Text>
      <ProductList>
        {productList.map((product: Product, i) => {
          return (
            <ProductCardContainer key={i}>
              <ProductCard product={product} />
            </ProductCardContainer>
          );
        })}
      </ProductList>
    </Container>
  );
}
