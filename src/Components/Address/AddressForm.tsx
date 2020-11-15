import React from "react";
import styled from "styled-components";
import Input from "../Input";
import { findAddress } from "../../API/KaKaoAddressApi";
import { AddressFormProp } from "../../Routes/OrderSheet";

const Container = styled.div`
  width: 800px;
`;
const Column = styled.div`
  border: 1px solid lightgray;
  display: flex;
  height: 50px;
  align-items: center;
  :nth-child(2) {
    height: 150px;
  }
  :nth-child(3) {
    input {
      :not(:first-child) {
        margin: 0 10px;
      }
      :nth-child(2) {
        margin-left: 0;
      }
      width: 50px;
    }
  }
  label {
    width: 30%;
    margin-left: 1em;
  }
`;

const AddressSearchBox = styled.div``;
const AddressSearchBoxColumn = styled.div`
  margin-top: 10px;
  input {
    margin-right: 10px;
  }
`;

export default function AddressForm({
  addressFormProp,
}: {
  addressFormProp: AddressFormProp;
}) {
  const {
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
  } = addressFormProp;
  const clickZipcodeBtn = () => {
    findAddress(setzip, setaddress);
  };
  //우변번호 버튼을 누르면 카카오 도로명 api 가 뜨고 결과값을
  //zip address에 설정해줌
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = "";
  };
  return (
    <Container>
      <Column>
        <label>받으시는 분 </label>
        <Input inputProp={{ ...name }} />
      </Column>
      <Column>
        <label>주소 </label>
        <AddressSearchBox>
          <AddressSearchBoxColumn>
            <Input inputProp={{ value: zip, onChange: onChangeAddress }} />
            <button type="button" onClick={clickZipcodeBtn}>
              우편번호
            </button>
          </AddressSearchBoxColumn>
          <AddressSearchBoxColumn>
            <Input inputProp={{ value: address, readOnly: true }} />
            <Input inputProp={{ ...address2, required: false }} />
          </AddressSearchBoxColumn>
        </AddressSearchBox>
      </Column>
      <Column>
        <label>전화 번호 </label>
        <Input inputProp={{ ...phone1 }} />
        {" - "}
        <Input inputProp={{ ...phone2 }} />
        {" - "}
        <Input inputProp={{ ...phone3 }} />
      </Column>
      <Column>
        <label>배송 메세지</label>
        <Input inputProp={{ ...delivermessage, required: false }} />
      </Column>
    </Container>
  );
}
