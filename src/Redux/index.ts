import { combineReducers } from "redux"
import products, {ProductState} from './Post/reducer';


export interface RootState {
    products:ProductState
}

const rootReducer = combineReducers({
    products,
});
export default rootReducer;