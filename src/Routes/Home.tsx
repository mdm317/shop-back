import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import { getProducts } from '../Redux/Product/thunk';
import { signUp } from '../Redux/User/thunk';
import { Product, Image } from '../Model/db';
import { RootState } from '../Redux/index';

import { useState } from 'react';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    width:100%;

`;
const ProductCardContainer = styled.div`
    width: 300px;

`;
const Container = styled.div`

`;
const ProductList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Text= styled.p`
    margin-top:20px;
`;

export default ()=>{
    const [productKey, setProductKey] = useState("0");
    const dispatch = useDispatch();
    const productList = useSelector((state:RootState) => state.product.products);
    useEffect(() => {
        dispatch(getProducts());

    }, [])





    return (
  
  
     
                   <Container>
                    <Text>제품들</Text>
                    <ProductList>
                    {productList.map((product:Product, i)=>{
                        return (
                            <ProductCardContainer key={i}>                         
                                <ProductCard
                                index={i}
                                product={product}
                            />       
                            </ProductCardContainer>
                        )
                    })}
                    </ProductList>
                </Container>       

        
    );
}