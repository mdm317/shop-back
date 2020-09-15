import * as types from "./types"
import {Product} from '../../Model/db';
import {AxiosError} from 'axios';
import { createAsyncAction } from "typesafe-actions";

export interface GetProductsRequestAction {
  type: typeof types.GET_PRODUCTS_REQUEST
}
export interface GetProductsSuccessAction {
  type: typeof types.GET_PRODUCTS_SUCCESS
  payload: Product[]
}
export interface GetProductsFailureAction {
  type: typeof types.GET_PRODUCTS_FAILURE
  payload: AxiosError
}

export const getProductsRequest = ():GetProductsRequestAction=>{
  return{
    type:types.GET_PRODUCTS_REQUEST
  }
}
export const getProductsSuccess = (products:Product[]):GetProductsSuccessAction=>{
  return{
    type:types.GET_PRODUCTS_SUCCESS,
    payload:products
  }
}
export const getProductsFailure = (err:AxiosError):GetProductsFailureAction=>{
  return{
    type:types.GET_PRODUCTS_FAILURE,
    payload:err,
  }
}
// 엑션의 타입을 인터페이스로 정의하고 액션생성자도 따로 만들어야 되서 코드가 길어진다
export const addProductRequest = ()=>{
  return {
    type:types.ADD_PRODUCT_REQUEST
  }as const
}
export const addProductSuccess = (product:Product)=>{
  return <const>{
    type:types.ADD_PRODUCT_SUCCESS,
    payload : product
  }
}
export const addProductFailure = (err:AxiosError)=>{
  return <const>{
    type:types.ADD_PRODUCT_FAILURE,
    payload:err
  }
}

export const willDeleteProductRequest = ()=>{
  return <const>{
    type:types.WILL_DELETE_PRODUCT_REQUEST
  }
}
export const willDeleteProductSuccess = ()=>{
  return <const>{
    type:types.WILL_DELETE_PRODUCT_SUCCESS,
  }
}
export const willDeleteProductFailure = (err:AxiosError)=>{
  return <const>{
    type:types.WILL_DELETE_PRODUCT_FAILURE,
    payload:err
  }
}
// 액션 생성자만 따로 만들고 ReturnType 을 이용해 인터페이스를 사용하지 않는다

export const deleteProductRequest = ()=>{
  return <const>{
    type:types.DELETE_PRODUCT_REQUEST
  }
}
export const deleteProductSuccess = ()=>{
  return <const>{
    type:types.DELETE_PRODUCT_SUCCESS,
  }
}
export const deleteProductFailure = (err:AxiosError)=>{
  return <const>{
    type:types.DELETE_PRODUCT_FAILURE,
    payload:err
  }
}
export type GetProductsAction =
  | GetProductsRequestAction
  | GetProductsSuccessAction
  | GetProductsFailureAction

export type AddProductAction =
  | ReturnType<typeof addProductRequest>
  | ReturnType<typeof addProductSuccess>
  | ReturnType<typeof addProductFailure>

export type WillDeleteProductAction = 
  | ReturnType<typeof willDeleteProductRequest>
  | ReturnType<typeof willDeleteProductSuccess>
  | ReturnType<typeof willDeleteProductFailure>

  
export type DeleteProductAction = 
| ReturnType<typeof deleteProductRequest>
| ReturnType<typeof deleteProductSuccess>
| ReturnType<typeof deleteProductFailure>

type ProductAction = 
  GetProductsAction
  |AddProductAction
  |WillDeleteProductAction
  |DeleteProductAction;
export default ProductAction 
