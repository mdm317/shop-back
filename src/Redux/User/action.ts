import * as types from "./types";
import { createAsyncAction } from "typesafe-actions";
import { User, Product, Order, Review } from "../../Model/db";
import { AxiosError } from "axios";

interface UserAndCart {
  user: User;
  cart: Product[];
}
interface ReturnOrderSuccess {
  order: Order;
  remainCash: number;
}
export interface CheckIdData {
  message: string;
  possible: boolean;
}
export const getProfileAction = createAsyncAction(
  types.GET_PROFILE_REQUEST,
  types.GET_PROFILE_SUCCESS,
  types.GET_PROFILE_FAILURE
)<null, UserAndCart, AxiosError>();

export const getUserAction = createAsyncAction(
  types.GET_USERS_REQUEST,
  types.GET_USERS_SUCCESS,
  types.GET_USERS_FAILURE
)<null, User, AxiosError>();

export const loginAction = createAsyncAction(
  types.LOG_IN_REQUEST,
  types.LOG_IN_SUCCESS,
  types.LOG_IN_FAILURE
)<null, UserAndCart, AxiosError>();

export const logoutAction = createAsyncAction(
  types.LOG_OUT_REQUEST,
  types.LOG_OUT_SUCCESS,
  types.LOG_OUT_FAILURE
)<null, null, AxiosError>();

export const signUpAction = createAsyncAction(
  types.SIGN_UP_REQUEST,
  types.SIGN_UP_SUCCESS,
  types.SIGN_UP_FAILURE
)<null, boolean, AxiosError>();

export const checkIdAction = createAsyncAction(
  types.CHECK_ID_REQUEST,
  types.CHECK_ID_SUCCESS,
  types.CHECK_ID_FAILURE
)<null, CheckIdData, AxiosError>();

export const editProfileAction = createAsyncAction(
  types.EDIT_PROFILE_REQUEST,
  types.EDIT_PROFILE_SUCCESS,
  types.EDIT_PROFILE_FAILURE
)<null, User, AxiosError>();

export const addCartAction = createAsyncAction(
  types.ADD_CART_REQUEST,
  types.ADD_CART_SUCCESS,
  types.ADD_CART_FAILURE
)<null, Product | null, AxiosError>();

export const deleteCartAction = createAsyncAction(
  types.DELETE_CART_REQUEST,
  types.DELETE_CART_SUCCESS,
  types.DELETE_CART_FAILURE
)<null, Product[], AxiosError>();

export const addOrderAction = createAsyncAction(
  types.ADD_ORDER_REQUEST,
  types.ADD_ORDER_SUCCESS,
  types.ADD_ORDER_FAILURE
)<null, ReturnOrderSuccess, AxiosError>();

export const chargeCashAction = createAsyncAction(
  types.CHARGE_CASH_REQUEST,
  types.CHARGE_CASH_SUCCESS,
  types.CHARGE_CASH_FAILURE
)<null, number, AxiosError>();

export const getOrdersAction = createAsyncAction(
  types.GET_ORDERS_REQUEST,
  types.GET_ORDERS_SUCCESS,
  types.GET_ORDERS_FAILURE
)<null, Order[], AxiosError>();

export const addReviewAction = createAsyncAction(
  types.ADD_REVIEW_REQUEST,
  types.ADD_REVIEW_SUCCESS,
  types.ADD_REVIEW_FAILURE
)<null, Review, AxiosError>();

export const emptyCartAction = createAsyncAction(
  types.EMPTY_CART_REQUEST,
  types.EMPTY_CART_SUCCESS,
  types.EMPTY_CART_FAILURE
)<null, [], AxiosError>();
