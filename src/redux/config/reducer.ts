import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { AuthState } from '../slice/authSlice';

export interface RootReducer {
    authReducer: AuthState,

}

const rootReducer = {
    authReducer,

}

export default combineReducers(rootReducer);