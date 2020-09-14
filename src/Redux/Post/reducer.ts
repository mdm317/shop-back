import * as types from "./types"
import {Product} from '../../Model/db';
import {GetProductAction} from './action'

export interface ProductState {
    products: Product[]
}

const initialState: ProductState = {
    products:[],
};

const productReducer = (
    state = initialState,
    action: GetProductAction
  ): ProductState => {
    switch (action.type) {
      case types.GET_PRODUCT_LIST:
        return {
          ...state,
          products : action.payload
        }
      default:
        return state
    }
  }
  
export default productReducer