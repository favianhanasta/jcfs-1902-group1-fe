import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { productReducer } from './productReducer';
import {transactionReducer} from './transactionReducer'

export const rootReducers = combineReducers({
    userReducer,
    productReducer,
    transactionReducer
})
