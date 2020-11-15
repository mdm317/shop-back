import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Redux/User/thunk";

import { withRouter } from "react-router";
import { RootState } from "../Redux/index";
import QnaContainer from "../Components/Qna/QnaContainer";
import { match } from "../Types";
import axios from "axios";
import { BACK_URL, Product } from "../Model/db";
import ServerError from "./ServerError";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
`;
const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  display: block;
  max-width: 960px;
`;
const ProductWrapper = styled.div``;
const ProductHeader = styled.div`
  display: flex;
  border-bottom: 2px solid black;
`;
const ProductPreview = styled.div`
  width: 50%;
`;

const ProductBuy = styled.div`
  width: 50%;
  margin-left: 15%;
`;
const Row = styled.div`
  margin-top: 20px;
`;
const ProductDescriptions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Strong = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;
const Stock = styled.div`
  color: blueviolet;
`;
const Price = styled.div`
  color: coral;
`;

const AddCartBtn = styled.div`
  width: 80%;
  color: white;
  &:hover {
    cursor: pointer;
  }
  background-color: black;
  border-radius: 10% / 50%;
  text-align: center;
  padding: 20px 0;
`;
const NaverPay = styled.div``;

interface MatchParams {
  productIndex: string;
}

function ProductDetail({ match }: { match: match<MatchParams> }) {
  const { productIndex } = match.params;
  const [product, setproduct] = useState<Product | null>(null);
  const [err, seterr] = useState(0);
  const user = useSelector((state: RootState) => state.user.user);
  const [popupClosed, setpopupClosed] = useState(false);

  useEffect(() => {
    if (!popupClosed) {
      (async function () {
        try {
          const response = await axios.get(
            BACK_URL + `/product/detail?productId=${productIndex}`
          );
          setproduct(response.data);
        } catch (error) {
          seterr(1); //서버 에러시 serverError 페이지를 렌더링함
        }
      })();
    }
  }, [popupClosed]);
  const dispatch = useDispatch();
  if (!product) {
    return <div></div>;
  }
  if (err) {
    return <ServerError />;
  }

  const clickAddCart = () => {
    if (!user) {
      toast.error("you need to login");
      return;
    }
    dispatch(addCart(product.id));
  };

  return (
    <Wrapper>
      <Container>
        <ProductWrapper>
          <ProductHeader>
            <ProductPreview>
              <img width={400} height={400} src={product.thumbnail}></img>
            </ProductPreview>
            <ProductBuy>
              <Row>
                <Strong>{product.name}</Strong>
              </Row>
              <Row>
                <Stock>재고 {product.stock} 개</Stock>
              </Row>
              <Row>
                <Price>{product.price} 원</Price>
              </Row>
              <Row>
                <AddCartBtn onClick={clickAddCart}>장바구니</AddCartBtn>
              </Row>
              <Row>
                <NaverPay />
              </Row>
            </ProductBuy>
          </ProductHeader>
          <ProductDescriptions>
            <p>{product.description}</p>
            {product.productImage.map((image, i) => (
              <div key={i}>
                <img width={"100%"} src={image.url} />
              </div>
            ))}
          </ProductDescriptions>

          <QnaContainer
            popupClosed={popupClosed}
            setpopupClosed={setpopupClosed}
            productId={product.id}
            qnaList={product.qnas}
          />
        </ProductWrapper>
      </Container>
    </Wrapper>
  );
}

export default withRouter(ProductDetail);
