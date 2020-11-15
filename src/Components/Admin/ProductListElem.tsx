import React from "react";
import styled from "styled-components";
import { Product } from "../../Model/db";

const Container = styled.li`
  display: flex;
  align-items: center;
  margin-top: 10px;
  div {
    margin-left: 2em;
  }
  button {
    margin-left: 2em;
  }
`;
export default function ProductListElem({
  product,
  setproduct,
  setmodalVisible,
}: {
  product: Product;
  setproduct: React.Dispatch<any>;
  setmodalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const clickBtn = () => {
    setproduct(product);
    setmodalVisible(true);
  };
  return (
    <Container>
      <img width={100} height={100} src={product.thumbnail} />
      <div>제품 이름:{product.name}</div>
      <div>제품 가격:{product.price}</div>
      <div>제품 제고:{product.stock}</div>
      <button onClick={clickBtn}>수정</button>
    </Container>
  );
}
