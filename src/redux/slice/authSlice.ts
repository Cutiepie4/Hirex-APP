import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    phoneNumber: string,
    access_token: string,
    role: string,
    isLoading: boolean,
    showTabBar: boolean,
};

const initialState: AuthState = {
    phoneNumber: '',
    access_token: '',
    role: '',
    isLoading: false,
    showTabBar: false,
};

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
        logout: (state) => initialState,
        showLoading: (state) => {
            return { ...state, isLoading: true };
        },
        hideLoading: (state) => {
            return { ...state, isLoading: false };
        },
        showTabBar: (state) => {
            return { ...state, showTabBar: true };
        },
        hideTabBar: (state) => {
            return { ...state, showTabBar: false };
        }
    },
    extraReducers(builder) {

    },
});

export const { login, showLoading, hideLoading, logout, showTabBar, hideTabBar } = authSlice.actions;
export default authSlice.reducer;