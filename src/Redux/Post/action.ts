import * as types from "./types"
import {Product} from '../../Model/db';

export interface GetProductAction {
  type: typeof types.GET_PRODUCT_LIST
  payload: Product[]
}