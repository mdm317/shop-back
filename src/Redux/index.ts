import { combineReducers } from "redux"
import product from './Product/_index';



const rootReducer = combineReducers({
    product,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;