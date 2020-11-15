import React from "react";
import styled from "styled-components";
import { Product } from "../Model/db";
import { Link } from "react-router-dom";

/* const Container = styled.div`
    width: 300px;

`; */

const Box = styled.div`
  margin-top: 3em;
  margin-right: 20px;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
`;
const P = styled.p`
  margin-top: 0.3em;
`;
const Strong = styled.div`
  margin-top: 0.5em;
  font-weight: 700;
`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Box>
      <Link to={`/productDetail/${product.id}`}>
        <img width={280} height={280} src={product.thumbnail}></img>
      </Link>
      <P>{product.name}</P>
      <Strong>{product.price} 원</Strong>
    </Box>
  );
}
