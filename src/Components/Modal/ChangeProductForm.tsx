import React, { useEffect } from 'react';
import styled from 'styled-components';
import AddProduct from '../../Routes/AddProduct';
import { RouteComponentProps } from 'react-router-dom';
import { Product } from '../../Model/db';

const Container = styled.div`
    position:fixed;
    top:20%;
    left:20%;
    border: 1px solid red;
    background-color:white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Button = styled.button`
    position:absolute;
    right:0;
`;
interface Props extends RouteComponentProps{
    setmodalVisible:React.Dispatch<React.SetStateAction<boolean>>
    product:Product|undefined
}
export default (props:Props)=>{
    useEffect(() => {
        document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            width:${100}%;
        `;
        return () => {
            const scrollY = document.body.style.top
            document.body.style.cssText = `position: ""; top: "";`
            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }, []);
    const clickCloseBtn= (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        props.setmodalVisible(false);
    }
    return (
        <Container>
            <Button onClick={clickCloseBtn}>✖</Button>
            <AddProduct product={props.product} match={props.match} history={props.history} location={props.location}/>
        </Container>
    )
}