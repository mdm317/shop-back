import { combineReducers } from "redux"
import product from './Product/_index';
import user from './User/_index';
import popup from './Popup/reducer';
import admin from './Admin/reducer';

const rootReducer = combineReducers({
    product,
    user,
    popup,
    admin
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;