import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const dummy = [
    {
        id:'12',
price:'12',
stock:12,
description:'12',
thumbnail:'12',
imageUrl:'12',
willDelete:false,
createdAt:"12",
    },{
        id:'12',
        price:'12',
        stock:12,
        description:'12',
        thumbnail:'12',
        imageUrl:'12',
        willDelete:false,
        createdAt:"12",
    }
]

export default ()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type:'GET_PRODUCT_LIST',
            payload:dummy
        })
    }, []);
    return (<>"HELLO"</>);
}