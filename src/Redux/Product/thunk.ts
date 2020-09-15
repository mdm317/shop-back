import { ThunkAction } from 'redux-thunk';

import {RootState} from '../index'

import axios from "axios";
import { dbUrl } from "../../db";
import { GetProductsAction, AddProductAction, addProductRequest, addProductSuccess, addProductFailure, getProductsRequest, getProductsSuccess, getProductsFailure, WillDeleteProductAction, willDeleteProductRequest, willDeleteProductSuccess, willDeleteProductFailure, deleteProductRequest, deleteProductSuccess, deleteProductFailure, DeleteProductAction } from './action';
import { Product } from '../../Model/db';



function getProductsAPI(){
  return axios(dbUrl+ '/product');
}
async function addProductsAPI(product:Product){
  return axios.post(dbUrl+ '/product/add', {
    ...product
  })
}
function willDeleteAPI(pId:string){
  return axios(dbUrl+ `/product/willdelete?productId:${pId}`);
}
function deleteAPI(pId:string){
  return axios(dbUrl+ `/product/delete?productId:${pId}`);
}
//getProducts 의 리턴벨류는 
export function getProducts():ThunkAction<void,RootState, null, GetProductsAction>{
  return async (dispatch) => {
    dispatch(getProductsRequest());
    try {
      const response = await getProductsAPI();
      dispatch(getProductsSuccess(response.data));
    } catch (err) {
      dispatch(getProductsFailure(err));
      throw err;
    }
  };
}

export function addProduct(product:Product):ThunkAction<void,RootState, null, AddProductAction>{
  return async(dispatch)=>{
    dispatch(addProductRequest());
    try {
      const response = await addProductsAPI(product);
      dispatch(addProductSuccess(response.data));
    } catch (err) {
      dispatch(addProductFailure(err));
      throw err;
    }
  }
}
export function willDeleteProduct(pid:string):ThunkAction<void,RootState, null, WillDeleteProductAction>{
  return async(dispatch)=>{
    dispatch(willDeleteProductRequest());
    try {
      const response = await willDeleteAPI(pid);
      dispatch(willDeleteProductSuccess());
    }catch (err) {
      dispatch(willDeleteProductFailure(err));
      throw err;
    }
  }
}

export function deleteProduct(pid:string):ThunkAction<void,RootState, null, DeleteProductAction>{
  return async(dispatch)=>{
    dispatch(deleteProductRequest());
    try {
      const response = await deleteAPI(pid);
      dispatch(deleteProductSuccess());
    }catch (err) {
      dispatch(deleteProductFailure(err));
      throw err;
    }
  }
}
