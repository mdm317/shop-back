import React from 'react';
import styled from 'styled-components';
import Input from '../Components/Input';
import {useInputNum2 } from '../Hooks/useInput';
import { chargeCash, deleteCart } from '../Redux/User/thunk';
import { getProducts } from '../Redux/Product/thunk';
import { useDispatch } from 'react-redux';

const Container = styled.div`
`;

export default ()=>{
    const chargeAmount = useInputNum2("");
    const dispatch = useDispatch();
    const formSubmit= (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(chargeCash(Number(chargeAmount.value)))
    }
    return(
        <Container>
            <form onSubmit={formSubmit}>
                <span>충전할 금액</span>
                <Input inputProp={{...chargeAmount}}/>
                <button>충전</button>
            </form>


        </Container>
    );
}