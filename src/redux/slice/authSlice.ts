import { createSlice } from "@reduxjs/toolkit"

export interface AuthState {
    username: string,
    access_token: string,
    role: string,
    isLoading: boolean,
    count: number
}

const initialState: AuthState = {
    username: '',
    access_token: '',
    role: '',
    isLoading: false,
    count: 0
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        login: (state) => {

        },
        increase: (state) => {
            return { ...state, count: state.count + 1 };
        },
        showLoading: (state) => {
            return { ...state, isLoading: true };
        },
        hideLoading: (state) => {
            return { ...state, isLoading: false };
        }
    },
    extraReducers(builder) {

    },
})

export const { login, increase, showLoading, hideLoading } = authSlice.actions;
export default authSlice.reducer