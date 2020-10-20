import { ThunkAction } from 'redux-thunk';

import {RootState} from '../index'

import axios from "axios";
import { GetProductsAction, AddProductAction, addProductRequest, addProductSuccess, addProductFailure, getProductsRequest, getProductsSuccess, getProductsFailure, WillDeleteProductAction, willDeleteProductRequest, willDeleteProductSuccess, willDeleteProductFailure, deleteProductRequest, deleteProductSuccess, deleteProductFailure, DeleteProductAction, AddReviewAction, addReviewRequest, addReviewSuccess, addReviewFailure, AddQuetionAction, addQuestionRequest, addQuestionSuccess, addQuestionFailure, AddAnswerAction, addAnswerFailure, addAnswerRequest, addAnswerSuccess, GetPrdQuestionListAction, getPrdQuestionListRequest, getPrdQuestionListSuccess, getPrdQuestionListFailure, AddImageAction, addImageRequest, addImageSuccess, addImageFailure } from './action';
import { Product } from '../../Model/db';
import { toast } from 'react-toastify';
const dbUrl = process.env.REACT_APP_DBURL;

export interface AddProductData{
  name:string
  price:number
  stock:number
  imgUrls:{url:string,idx:string}[]
  description?:string
  thumbnail?:string
}

function getProductsAPI(){
  return axios(dbUrl+ '/product',{withCredentials:true});
}
async function addProductsAPI(product:AddProductData){
  return axios.post(dbUrl+ '/product/add', {
    ...product
  },{withCredentials:true});
}
function willDeleteAPI(pId:string){
  return axios(dbUrl+ `/product/willdelete?productId:${pId}`);
}
function deleteAPI(pId:string){
  return axios(dbUrl+ `/product/delete?productId:${pId}`);
}
const checkServerConnet = (err:any)=>{
  if(!err.response){
    toast.error('Server Error Try rater')
  }
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
      checkServerConnet(err);
      throw err;
    }
  };
}

export function addProduct(product:AddProductData):ThunkAction<void,RootState, null, AddProductAction>{
  return async(dispatch)=>{
    dispatch(addProductRequest());
    try {
      const response = await addProductsAPI(product);
      dispatch(addProductSuccess(response.data));
    } catch (err) {
            
      dispatch(addProductFailure(err));
      checkServerConnet(err);
      console.dir(err);
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
      checkServerConnet(err);

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
      checkServerConnet(err);
      
      throw err;
    }
  }
}


const addReviewAPI = (param:any)=>{
  return axios.post(dbUrl+'/review/add',{...param},{withCredentials:true});
}
export const addReview= (param:any):ThunkAction<void,RootState, null, AddReviewAction>=>{
  return async(dispatch)=>{
    dispatch(addReviewRequest());
    try {
      const response = await addReviewAPI(param);
      dispatch(addReviewSuccess(response.data));
    }catch (err) {
      dispatch(addReviewFailure(err));
      throw err;
    }
  }
}
  
const addQuestionAPI = (param:any)=>{
  return axios.post(dbUrl+'/qna/addQuestion',{...param},{withCredentials:true});
}
export const addQuestion= (param:any):ThunkAction<void,RootState, null, AddQuetionAction>=>{
  return async(dispatch)=>{
    dispatch(addQuestionRequest());
    try {
      const response = await addQuestionAPI(param);
      dispatch(addQuestionSuccess(response.data));
    }catch (err) {
      dispatch(addQuestionFailure(err));
      throw err;
    }
  }
}

const addAnswerAPI = (param:AddAnswerParam)=>{
  return axios.post(dbUrl+'/qna/addAnswer',{...param},{withCredentials:true});
}
//content,qId,productId
interface AddAnswerParam{
  content:string
  qId:string
  productId:string
}
export const addAnswer= (param:AddAnswerParam):ThunkAction<void,RootState, null, AddAnswerAction>=>{
  return async(dispatch)=>{
    dispatch(addAnswerRequest());
    try {
      const response = await addAnswerAPI(param);
      dispatch(addAnswerSuccess(response.data));
    }catch (err) {
      console.log('error',err);
      
      dispatch(addAnswerFailure(err));
      return;
    }
  }
}
const getPrdQueAPI = (productId:string)=>{
  return axios.get(dbUrl+`/qna/product/getquestion?productId=${productId}`);
}
export const getPrdQueList= (productId:string):ThunkAction<void,RootState, null, GetPrdQuestionListAction>=>{
  return async(dispatch)=>{
    dispatch(getPrdQuestionListRequest());
    try {
      const response = await getPrdQueAPI(productId);
      
      dispatch(getPrdQuestionListSuccess(response.data));
    }catch (err) {
      console.log('error',err);
      dispatch(getPrdQuestionListFailure(err));
      return;
    }
  }
}

const addImageAPI = (form:FormData,idx:string)=>{
  // const keys = form.keys();
  // const values = form.values();
  // for(let v of  Array.from(keys)){
  //   console.log(v);
  // }
  // for(let v of  Array.from(values)){
  //   console.log(v);
  // }
  return axios.post(dbUrl+`/image/add/${idx}`,form,
  {withCredentials:true});
}
export const addImage= (form:FormData,idx:string):ThunkAction<void,RootState, null, AddImageAction>=>{
  return async(dispatch)=>{
    dispatch(addImageRequest());
    try {
      const response = await addImageAPI(form,idx);
      
      dispatch(addImageSuccess(response.data));
    }catch (err) {
      console.log('error',err);
      dispatch(addImageFailure(err));
    }
  }
}