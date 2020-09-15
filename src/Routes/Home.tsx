import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../Redux/Product/thunk';


export default ()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);
    return (<>"HELLO"</>);
}