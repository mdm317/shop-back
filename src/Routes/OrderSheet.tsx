import React, { useEffect } from "react";
import styled from "styled-components";
import AddressForm from "../Components/Address/AddressForm";
import Payment from "../Components/Payment";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/index";
import FatProductCard from "../Components/FatProductCard";
import { useState } from "react";
import { useInputNumMaxLen, useInputStr2 } from "../Hooks/useInput";
import { toast } from "react-toastify";
import { addOrder } from "../Redux/User/thunk";
import { RouteComponentProps } from "react-router-dom";

const Container = styled.div`
  margin-left: 10%;
`;
const Title = styled.div`
  margin: 10px 0;
  font-size: 2rem;
  font-weight: 600;
`;

const CartItemList = styled.div`
  border: 0.5rem solid lightgray;
  padding: 10px;
`;
const ProductColumn = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 70px;
  }
`;

const Section = styled.div`
  margin-top: 20px;
`;
const Button = styled.button`
  height: 30px;
  width: 100px;
  background-color: blueviolet;
  color: white;
  margin: 30px 0;
  margin-left: 300px;
  border-radius: 5px;
`;
interface ProductQuantity {
  productId: string;
  quantity: number;
  price: number;
}
export interface AddressFormProp {
  name: ReturnType<typeof useInputStr2>;
  zip: string;
  setzip: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setaddress: React.Dispatch<React.SetStateAction<string>>;
  address2: ReturnType<typeof useInputStr2>;
  phone1: ReturnType<typeof useInputNumMaxLen>;
  phone2: ReturnType<typeof useInputNumMaxLen>;
  phone3: ReturnType<typeof useInputNumMaxLen>;
  delivermessage: ReturnType<typeof useInputStr2>;
}

export default function OrderSheet(props: RouteComponentProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const products = useSelector((state: RootState) => state.user.cart);

  const [quantityList, setQuantityList] = useState<ProductQuantity[]>([]);
  //제품의 수량과 id를 같이 묶어두는 방식으로 보관하기 위해 따로
  // 변수를 만듬
  const [totalPrice, settotalPrice] = useState(0);
  const [paymentPossible, setpaymentPossible] = useState(false);
  // setQuantityList(newQuantityList);
  //addressForm
  const name = useInputStr2("");
  const [zip, setzip] = useState("");
  const [address, setaddress] = useState("");
  const address2 = useInputStr2("");
  const phone1 = useInputNumMaxLen("", 4);
  const phone2 = useInputNumMaxLen("", 4);
  const phone3 = useInputNumMaxLen("", 4);
  const delivermessage = useInputStr2("");
  const addressFormProp = {
    name,
    zip,
    setzip,
    address,
    setaddress,
    address2,
    phone1,
    phone2,
    phone3,
    delivermessage,
  };

  useEffect(() => {
    const newQuantityList = products.map((product) => ({
      productId: product.id,
      price: product.price,
      quantity: 1,
    }));
    const price = newQuantityList.reduce((ac, cu) => {
      return ac + cu.quantity * cu.price;
    }, 0);
    setQuantityList(newQuantityList);
    settotalPrice(price);
  }, [products]);
  if (!user) {
    return null;
  }
  //장바구니의 제품의 목록을 가져옴
  const onQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    let quantity = Number(e.target.value);
    if (quantity <= 0) {
      e.target.value = "1";
      toast.error("1개 이상 구매가능 합니다!");
      quantity = 1;
    }
    const idx = Number(e.target.id);
    const elem = quantityList[idx];
    const changedElem: ProductQuantity = {
      ...elem,
      quantity,
    };
    const newQuantityList = [
      ...quantityList.slice(0, idx),
      changedElem,
      ...quantityList.slice(idx + 1),
    ];

    setQuantityList(newQuantityList);
    const newPrice = newQuantityList.reduce((ac, cu) => {
      return ac + cu.quantity * cu.price;
    }, 0);
    settotalPrice(newPrice);
  };
  //유저가 구매할 물건의 수량을 번경할때마다 실행해서
  //총 구매금액을 업데이트
  //제품의 id와 수량을 업데이트
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentPossible) {
      toast.error("잔액 부족");
      return;
    }
    const productIdAndCount = quantityList.map((item) => ({
      id: item.productId,
      count: item.quantity,
    }));
    //제품의 id와 수량을 객체에 따로 보관해서 넘겨줌
    const phone = phone1.value + "-" + phone2.value + "-" + phone3.value;
    dispatch(
      addOrder(
        {
          productIdAndCount,
          cash: totalPrice,
          address1: address,
          address2: address2.value,
          zipcode: zip,
          name: name.value,
          message: delivermessage.value,
          phone,
        },
        props
      )
    );
  };
  // 잔액 부족시 결제 요청을 보내지 않음
  return (
    <Container>
      <Title>결제창</Title>
      <div>장바구니 목록</div>
      <form onSubmit={onSubmit}>
        <Section>
          <CartItemList>
            {products.map((product, i) => (
              <ProductColumn key={product.id}>
                <FatProductCard product={product} />
                <input
                  id={i.toString()}
                  onChange={onQuantity}
                  type="number"
                  defaultValue={1}
                ></input>
              </ProductColumn>
            ))}
          </CartItemList>
        </Section>
        <Section>
          <Payment
            cash={user.point}
            setpaymentPossible={setpaymentPossible}
            price={totalPrice}
          />
        </Section>
        <Section>
          <AddressForm addressFormProp={addressFormProp} />
        </Section>
        <Button>주문하기</Button>
      </form>
    </Container>
  );
}
