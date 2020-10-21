import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import OrderList from './OrderList';
import ProductList from '../Components/ProductList';
import { RouteComponentProps } from 'react-router-dom';
import QuestionList from '../Components/Admin/QuestionList';

const Wrapper = styled.div`
    
`;

const Header = styled.div`
    margin-top:1em;
    width:90%;
    margin: 1em auto;
    display:flex;
    justify-content:space-between;
`;
const HeaderColumn = styled.div`
    font-weight:600;
    font-size:1.5rem;
`;


const Container = styled.div`

`;
export default (props:RouteComponentProps)=>{
    
    const [state, setstate] = useState("0");
    const clickHeader = (e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        const elem = e.target as HTMLElement;
        setstate(elem.id);
    }
    return(
        <Wrapper>
            <Header>
                <HeaderColumn id="1" onClick={clickHeader}>주문목록</HeaderColumn>
                <HeaderColumn id="2" onClick={clickHeader}>제품목록</HeaderColumn>
                <HeaderColumn id="3" onClick={clickHeader}>질문 목록</HeaderColumn>
            </Header>
            <Container>
                {state==="1" && <OrderList/>}
                {state==="2" &&  <ProductList match={props.match} history={props.history} location={props.location}/>}
                {state==="3" &&  <QuestionList match={props.match} history={props.history} location={props.location}/>}
            </Container>
        </Wrapper>
    )
}