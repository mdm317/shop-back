import { AxiosError } from 'axios';
import { createReducer, action } from 'typesafe-actions';
import * as types from './types';

import { User, Product, Order } from '../../Model/db';
import { UserAction, LOG_OUT_FAILURE } from './types';
import { type } from 'os';
import { CheckIdData } from './action';
import { editProfile, addReview } from './thunk';
import { ADD_ANSWER_FAILURE } from '../Product/types';

interface UserState {
    user:User|null
    orders:Order[]
    err:{
        getProfileErr:AxiosError|null,
        getUsersErr:AxiosError|null,
        loginErr:AxiosError|null,
        logoutErr:AxiosError|null,
        signUpErr:AxiosError|null,
        checkIdErr:AxiosError|null,
        editProfileErr:AxiosError|null,
        addCartErr:AxiosError|null,
        deleteCartErr:AxiosError|null,
        addOrderErr:AxiosError|null,
        chargeErr:AxiosError|null,
        getOrdersErr:AxiosError|null,
        addReivewErr:AxiosError|null,
        emptyCartErr:AxiosError|null,
    }
    checkId:CheckIdData
    cart:Product[]
}

const initialState:UserState = {
    user:null,
    orders:[],
    err:{
        getProfileErr:null,
        getUsersErr:null,
        loginErr:null,
        logoutErr:null,
        signUpErr:null,
        checkIdErr:null,
        editProfileErr:null,
        addCartErr:null,
        deleteCartErr:null,
        addOrderErr:null,
        chargeErr:null,
        getOrdersErr:null,
        addReivewErr:null,
        emptyCartErr:null,
    },
    checkId:{message:"",possible:false},
    cart:[],


}

const userReducer = createReducer<UserState,UserAction>(initialState,{
    GET_PROFILE_REQUEST:(state)=>({...state, err:{...state.err, getProfileErr:null}}),
    GET_PROFILE_SUCCESS:(state,action)=>({...state, user:action.payload.user, cart:action.payload.cart, }),
    GET_PROFILE_FAILURE:(state,action)=>({...state,err:{...state.err,getProfileErr:action.payload}}),
    GET_USERS_REQUEST:(state) => ({...state, err:{...state.err, getUsersErr:null}}),
    GET_USERS_SUCCESS:(state,action)=>({...state,user:action.payload}),
    GET_USERS_FAILURE: (state, action)=>({...state,err:{...state.err,getUsersErr:action.payload}}),
    LOG_IN_REQUEST: (state) =>({...state, err:{...state.err, loginErr:null}}),
    LOG_IN_SUCCESS: (state, action) => ({...state, user:action.payload.user,cart:action.payload.cart }),
    LOG_IN_FAILURE: (state, action)=>({...state,err:{...state.err,loginErr:action.payload}}),
    LOG_OUT_REQUEST:(state) => ({...state, err:{...state.err, logoutErr:null}}),
    LOG_OUT_SUCCESS:(state) => ({...state, user:null}),
    LOG_OUT_FAILURE:(state, action)=>({...state,err:{...state.err,logoutErr:action.payload}}),
    SIGN_UP_REQUEST: (state)=>({...state, err:{...state.err, signUpErr:null}}),
    SIGN_UP_SUCCESS: (state)=>({...state}),
    SIGN_UP_FAILURE: (state, action)=>({...state,err:{...state.err,signUpErr:action.payload}}),
    CHECK_ID_REQUEST:(state) => ({...state, err:{...state.err, checkIdErr:null}}),
    CHECK_ID_SUCCESS:(state, action) => ({...state, checkId:action.payload}),
    CHECK_ID_FAILURE: (state, action)=>({...state,err:{...state.err,checkIdErr:action.payload}}),
    EDIT_PROFILE_REQUEST:(state) =>({...state, err:{...state.err, editProfileErr:null}}),
    EDIT_PROFILE_SUCCESS :(state, action) => ({...state, user:action.payload}),
    EDIT_PROFILE_FAILURE: (state, action)=>({...state,err:{...state.err,editProfileErr:action.payload}}),
    ADD_CART_REQUEST:(state) =>({...state, err:{...state.err, addCartErr:null}}),
    ADD_CART_SUCCESS :(state, action) => {
        if(!action.payload){
            return {...state};
        }
        return {
            ...state,
            cart:[
                ...state.cart,
                action.payload
            ]
        }
    },
    ADD_CART_FAILURE: (state, action)=>({...state,err:{...state.err,addCartErr:action.payload}}),
    DELETE_CART_REQUEST:(state) => ({...state, err:{...state.err, deleteCartErr:null}}),
    DELETE_CART_SUCCESS :(state, action) => {
        if(!state.user)return {...state}
        return {
            ...state,
            cart:action.payload
        }
    },
    DELETE_CART_FAILURE: (state, action)=>({...state,err:{...state.err,deleteCartErr:action.payload}}),
    ADD_ORDER_REQUEST:(state) =>({...state, err:{...state.err, addOrderErr:null}}),
    ADD_ORDER_SUCCESS:(state,action) =>({
        ...state, 
        orders:[
            action.payload,
            ...state.orders
  
        ]
    }),
    ADD_ORDER_FAILURE:(state, action)=>({...state,err:{...state.err,addOrderErr:action.payload}}),
    CHARGE_CASH_REQUEST:(state, action)=>({...state,err:{...state.err,chargeErr:action.payload}}),
    CHARGE_CASH_SUCCESS:(state,action) =>{
        if(!state.user){
            return ({
                ...state
            })
        }
        const newUser = {...state.user, point:action.payload};
        return({
            ...state, 
            user:newUser
        });
    },
    CHARGE_CASH_FAILURE:(state, action)=>({...state,err:{...state.err,chargeErr:action.payload}}),
    GET_ORDERS_REQUEST:(state, action)=>({...state,err:{...state.err,getOrdersErr:null}}),
    GET_ORDERS_SUCCESS:(state,action) =>({
            ...state, 
            orders:action.payload
        }),
    GET_ORDERS_FAILURE:(state, action)=>({...state,err:{...state.err,getOrdersErr:action.payload}}),
    ADD_REVIEW_REQUEST:(state, action)=>({...state,err:{...state.err,getOrdersErr:null}}),
    ADD_REVIEW_SUCCESS:(state, action)=>{
        const review = action.payload;
        state.orders.forEach(order=>{
            if(order.id===review.orderId){
                order.products.forEach(product=>{
                    if(product.id===review.productId){
                        product.reviews=[review,...product.reviews];
                    }
                })
            }
        })
        return{
            ...state,
        }
    },
    ADD_REVIEW_FAILURE:(state, action)=>({...state,err:{...state.err,addReviewErr:action.payload}}),
    EMPTY_CART_REQUEST:(state, action)=>({...state,err:{...state.err,emptyCartErr:null}}),
    EMPTY_CART_SUCCESS:(state,action)=>({...state, cart:action.payload}),
    EMPTY_CART_FAILURE:(state, action)=>({...state,err:{...state.err,emptyCartErr:action.payload}}),
});

//object map 이 더 보기가 좋은것 같음
/* const userReducer = createReducer<UserState,UserAction>(initialState)
    .handleType([types.GET_USERS_REQUEST,
        types.LOG_IN_REQUEST,
        types.SIGN_UP_REQUEST,
        types.CHECK_ID_REQUEST,
        types.EDIT_PROFILE_REQUEST],state=>({...state}))
    .handleType([types.GET_USERS_FAILURE,
        types.LOG_IN_FAILURE,
        types.SIGN_UP_FAILURE,
        types.CHECK_ID_FAILURE,
        types.EDIT_PROFILE_FAILURE],(state,action)=>({...state,err:action.payload})) */
    
export default userReducer;
