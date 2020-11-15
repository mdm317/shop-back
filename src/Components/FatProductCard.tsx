import React from "react";
import styled from "styled-components";
import { Product } from "../Model/db";
import { useDispatch } from "react-redux";
import { deleteCart } from "../Redux/User/thunk";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 3vh;
`;
const Container = styled.div`
  display: flex;
`;
const ProductDescription = styled.div``;
const Strong = styled.p`
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 600;
`;
const Image = styled.div`
  width: 60%;
`;
const P = styled.p`
  margin-top: 5px;
  color: coral;
`;
const RemoveBtn = styled.button`
  margin-top: 30px;
`;
//장바구니용 product card
export default function FatProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const clickRemoveBtn = () => {
    dispatch(deleteCart(product.id));
  };
  return (
    <Wrapper>
      <Container>
        <Image>
          <img width={150} height={150} src={product.thumbnail}></img>
        </Image>
        <ProductDescription>
          <Strong>{product.name}</Strong>
          <P>{product.price} 원</P>
          <RemoveBtn type="button" onClick={clickRemoveBtn}>
            REMOVE
          </RemoveBtn>
        </ProductDescription>
      </Container>
    </Wrapper>
  );
}
