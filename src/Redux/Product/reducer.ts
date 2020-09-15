import * as types from "./types"
import {Product} from '../../Model/db';
import GetProductsAction from './action';
import {AxiosError} from 'axios';

export interface ProductState {
    products: Product[],
    error:AxiosError|null
}

const initialState: ProductState = {
    products:[],
    error:null,
};

const productReducer = (
    state = initialState,
    action: GetProductsAction
  ): ProductState => {
    switch (action.type) {
      case types.GET_PRODUCTS_REQUEST:
        return {
          ...state,
        }
      case types.GET_PRODUCTS_SUCCESS:
        return {
          ...state,
          products : action.payload
        }
      case types.GET_PRODUCTS_FAILURE:
        return {
          ...state,
          error : action.payload
        }
      case types.ADD_PRODUCT_REQUEST:
        return {
          ...state
        }
      case types.ADD_PRODUCT_SUCCESS:

        return {
          ...state,
          products: [action.payload, ...state.products],
        }
      case types.ADD_PRODUCT_FAILURE:
        return {
          ...state,
          error : action.payload
        }
      case types.WILL_DELETE_PRODUCT_REQUEST:
        return {
          ...state
        }
      case types.WILL_DELETE_PRODUCT_SUCCESS:

        return {
          ...state,
        }
      case types.WILL_DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          error : action.payload
        }
      case types.DELETE_PRODUCT_REQUEST:
        return {
          ...state
        }
      case types.DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
        }
      case types.DELETE_PRODUCT_FAILURE:
        return {
          ...state,
          error : action.payload
        }
      default:
        return state
    }
  }
  
export default productReducer