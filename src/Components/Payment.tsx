import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/index';

const Wrapper = styled.div`
`;
const Container = styled.div`

`;
const Title = styled.div`
    font-size:3rem;
    font-weight:600;
`;
const Column = styled.div`
    display:flex;
    margin-top:10px;
    div{
        :first-child{
            width:100px;
        }
    }
`;
const Alert = styled.span`
    color:red;
    font-size:1.5rem;

    
`;

export default ({price,setpaymentPossible}:
    {price:number,setpaymentPossible:React.Dispatch<React.SetStateAction<boolean>>})=>{
    const user = useSelector((state:RootState) => state.user.user);

    
    if(!user){
        return (<></>)
    }

    const cash = user.point;
    const remainCash = cash-price;


    if(remainCash<0){
        setpaymentPossible(false);
    }else{
        setpaymentPossible(true);
    }
    // useEffect(() => {
    //     console.log(remainCash);
    //     if(remainCash<0){
    //         setpaymentPossible(false);
    //     }else{
    //         setpaymentPossible(true);
    //     }
    // }, [remainCash]);

    return(
        <Container>
            <Title>캐시 사용</Title>
            <Column><div>금액</div> <div>{price}</div></Column>
            <Column><div>내 캐쉬</div> <div>{cash}</div></Column>
            {remainCash>=0?
            <Column><div>남을 캐쉬</div> <div>{remainCash}</div></Column>
            :
            <Column><Alert> 잔액 부족 </Alert></Column>

            }
        </Container>
    )
}