import axios, { AxiosError, AxiosHeaders } from "axios";
import { BASE_URL } from "../config/config";
import { store } from "../redux/store/store";

const BASE_API = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

BASE_API.interceptors.response.use(response => {
    console.log('----------------Response----------------')
    console.log(`Status: ${response.status}`)
    console.log(`Data: ${JSON.stringify(response?.data, null, 2)}`)
    return response
})

BASE_API.interceptors.request.use(
    async (config) => {
        console.log('----------------Request----------------')
        console.log(`Base URL: ${config.baseURL}`)
        console.log(`Headers: ${config.headers}`)
        console.log(`URL: ${config.url}`)
        console.log(`Payload: ${JSON.stringify(config.data)}`)
        const token = await store.getState().authReducer.access_token;
        if (config.headers && token.trim())
            (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
        return config;
    },
    (error) => {
        console.log('Request error: ', error)
        return Promise.reject(error);
    },
);

export {
    BASE_API,
};