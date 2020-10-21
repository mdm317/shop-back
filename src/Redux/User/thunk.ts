import { ThunkAction } from 'redux-thunk';
import {RootState} from '../index'
import { signUpAction, getUserAction, loginAction, checkIdAction, addCartAction, deleteCartAction, logoutAction, editProfileAction, getProfileAction, addOrderAction, chargeCashAction, getOrdersAction, emptyCartAction, addReviewAction } from './action';
import { UserAction } from './types';
import { User, Order } from '../../Model/db';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const dbUrl = process.env.REACT_APP_DBURL;

export interface LoginData{
  userId:string
  password:string
}
export interface SignUpData{
  userId:String;
  name:  String;
  password:string;
  email?:String;
  phone?: String;
}
interface Props extends RouteComponentProps {}

const getUserAPI =(id:string)=>{
  return axios.get(dbUrl+`/user/?id=${id}`);
}
const logInAPI = (param:LoginData)=>{
  return axios.post(dbUrl+'/user/login',{...param},{withCredentials:true});
}
const logOutAPI = ()=>{
  return axios.post(dbUrl+'/user/logout',{},{withCredentials:true});
}
const sighUpAPI = (param:SignUpData)=>{
  return axios.post(dbUrl+'/user/join',{...param});
}
const checkIdAPI = (id:string)=>{
  return axios.get(dbUrl+`/user/checkId?userId=${id}`);
} 
const editProfileAPI = (param:User)=>{
  return axios.post(dbUrl+'/user/editProfile',{...param});
}
const addCartAPI =(productId:string)=>{
  return axios.post(dbUrl+'/basket/add',{productId},{withCredentials:true});
  
}
const deleteCartAPI = (productId:string)=>{
  return axios.post(dbUrl+'/basket/delete',{productId},{withCredentials:true});

}
const getProfileAPI = ()=>{
  return axios.get(dbUrl+'/user/profile',{withCredentials:true});
}
export function getProfile():ThunkAction<void,RootState, null, UserAction>{
  return async(dispatch)=>{
    const { request, success, failure } = getProfileAction;
    dispatch(request(null)); 
    try {
      const response = await getProfileAPI();
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  }
}
export function getUser(id:string) :ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = getUserAction;
    dispatch(request(null)); 
    try {
      const response = await getUserAPI(id);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export function logIn(param:LoginData, props:Props) :ThunkAction<void,RootState, null, UserAction>{
    return async (dispatch) => {
      const { request, success, failure } = loginAction;
      dispatch(request(null)); 
      try {
        const response = await logInAPI(param);
        console.log(response.data);
        
        dispatch(success(response.data));
        props.history.push('/');
      } catch (e) {
        if(e.response && e.response.data && e.response.data.error ){
          toast.error(e.response.data.error.message);
        }
      
        dispatch(failure(e));
      }
    };
};
export function logOut(props:Props):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = logoutAction;
    dispatch(request(null)); 
    try {
      const response =await logOutAPI();
      dispatch(success(null));
      props.history.push('/');

    } catch (e) {
      console.dir(e);
      dispatch(failure(e));
    }
  };
}
export function signUp(param:SignUpData, props:Props) :ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = signUpAction;
    dispatch(request(null)); 
    try {
      const response = await sighUpAPI(param);
      dispatch(success(response.data));
      props.history.push('/login');
      toast.success('회원가입성공!  로그인 해주세요')
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
//직접 history 를 넘겼을때 타입에러의 이유는????
export function checkId(id:string) :ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = checkIdAction;
    dispatch(request(null)); // 파라미터를 비우면 타입 에러가 나기 때문에 undefined 전달
    try {
      const response = await checkIdAPI(id);
      if(!response.data.possible){
        toast.error(response.data.message)
      }
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};
export function editProfile(param:User) :ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = editProfileAction;
    dispatch(request(null)); 
    try {
      const response = await editProfileAPI(param);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
};

export function addCart(productId:string):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = addCartAction;
    dispatch(request(null)); 
    try {
      const response = await addCartAPI(productId);
      dispatch(success(response.data));
      toast.info('장바구니 담기 성공');
    } catch (e) {
      dispatch(failure(e));
      toast.error('try rater');
    }
  };
}
export function deleteCart(productId:string):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = deleteCartAction;
    dispatch(request(null)); 
    try {
      const response = await deleteCartAPI(productId);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
      toast.error('try rater');
    }
  };
}

interface addOrderParam{
  productIdAndCount:{  
    id:string
    count:number}[]
  cash:number
  address1:string
  address2:string
  zipcode:string
  name:string
  message:string
  phone:string
}
const addOrderAPI = (param:addOrderParam)=>{
  return axios.post(dbUrl+'/order/add',param,{withCredentials:true});
}
export function addOrder(param:addOrderParam,props:RouteComponentProps):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = addOrderAction;
    dispatch(request(null)); 
    try {
      const response = await addOrderAPI(param);
      dispatch(success(response.data));
      toast.success('주문 성공');
      props.history.push('/');
      dispatch(emptyCart());
    } catch (e) {
      console.dir(e);
      if(e.response){
        if(e.response.data){
          toast.error(e.response.data);
          setTimeout(()=>{
            props.history.push('/');

          },1000);

        }
      }else{
        dispatch(failure(e));
        throw Error;
      }

      //재고 수량 반영 해보기
    }
  };
}
const chargeCashAPI = (cash:number)=>{
  return axios.post(dbUrl+'/user/chargeCash',{cash},{withCredentials:true});
}
export function chargeCash(cash:number):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = chargeCashAction;
    dispatch(request(null)); 
    try {
      const response = await chargeCashAPI(cash);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
      toast.error('충전실패 ');

    }
  };
}
const getOrdersAPI = ()=>{
  return axios.get(dbUrl+'/order/',{withCredentials:true});
}
export function getOrder():ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = getOrdersAction;
    dispatch(request(null)); 
    try {
      const response = await getOrdersAPI();
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

interface AddReviewParam{
  productId:string
  OrderId:string
}
const addReviewAPI = (param:AddReviewParam)=>{
  return axios.get(dbUrl+'/review/add',{withCredentials:true});
}
export function addReview(param:AddReviewParam):ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = addReviewAction;
    dispatch(request(null)); 
    try {
      const response = await addReviewAPI(param);
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

const emptyCartAPI = async()=>{
 
  return  axios.post(dbUrl+'/basket/empty',{},{withCredentials:true});
}
export function emptyCart():ThunkAction<void,RootState, null, UserAction>{
  return async (dispatch) => {
    const { request, success, failure } = emptyCartAction;
    dispatch(request(null)); 
    try {
      const response = await emptyCartAPI();
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}