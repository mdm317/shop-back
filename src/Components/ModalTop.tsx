import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:100%;
    margin:0 auto;
`;
const WhiteBox = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:300px;
    height:100px;
    margin: 0 auto;
    padding-top:10px;
    position:relative;
    border-radius:5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    p{
        text-align:center;
    }
`;
const Button = styled.button`
    margin-top:15px;
    width:50px;
    height:25px;
    background-color:blue;
    color:white;
    border :0px;
    border-radius:3px;
`;
export default ({message}:{message:string})=>{
    const clickModalBtn = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        window.close();
    } 
    return(         
    <Container>
        <WhiteBox>  
            <p>{message}</p>
            <p>확인을 누르면 창이 닫힙니다.</p>
            <Button onClick={clickModalBtn}>확인</Button>
        </WhiteBox>
    </Container>)
}