import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    phoneNumber: string,
    access_token: string,
    role: string,
    isLoading: boolean,
    count: number
}

const initialState: AuthState = {
    phoneNumber: '',
    access_token: '',
    role: '',
    isLoading: false,
    count: 0
}

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ role: string, phoneNumber: string, access_token: string }>) => {
            const { role, phoneNumber, access_token } = action.payload;
            state.role = role;
            state.phoneNumber = phoneNumber;
            state.access_token = access_token;
        },
        logout: (state) => {
            state.role = '';
            state.phoneNumber = '';
            state.access_token = '';
        },
        increase: (state) => {
            return { ...state, count: state.count + 1 };
        },
        showLoading: (state) => {
            return { ...state, isLoading: true };
        },
        hideLoading: (state) => {
            return { ...state, isLoading: false };
        },
    },
    extraReducers(builder) {

    },
})

export const { login, increase, showLoading, hideLoading } = authSlice.actions;
export const { login, increase, logout } = authSlice.actions;
export default authSlice.reducer