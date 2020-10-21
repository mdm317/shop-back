import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/index';
import { getProducts } from '../Redux/Product/thunk';
import ProductListElem from './ProductListElem';
import { useState } from 'react';
import { Product } from '../Model/db';
import ChangeProductForm from './Modal/ChangeProductForm';
import { RouteComponentProps } from 'react-router-dom';

const Wrapper = styled.div`
    
`;

const Container = styled.ul`

`;

export default (props:RouteComponentProps)=>{
    const dispatch = useDispatch();
    const productList = useSelector((state:RootState) => state.product.products);
    const [product, setproduct] = useState<Product>();
    const [modalVisible, setmodalVisible] = useState(false);
    useEffect(() => {
        dispatch(getProducts());
    }, []);
    return (
        <Wrapper>
            {modalVisible && <ChangeProductForm product={product} setmodalVisible={setmodalVisible} match={props.match} history={props.history} location={props.location}/>}
            <Container>
                {productList.map(product=>(
                    <ProductListElem key ={product.id}
                    product={product}
                    setproduct={setproduct}
                    setmodalVisible={setmodalVisible}
                    />
                ))}
            </Container>
        </Wrapper>

    )
}