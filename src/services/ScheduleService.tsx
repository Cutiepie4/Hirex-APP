// File: services/scheduleService.js
import { BASE_URL } from '@/config/config';
import axios from 'axios';

const baseUrl = `${BASE_URL}`;
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjEyMyIsInN1YiI6IjEyMyIsImV4cCI6MTcxNzcyODI1OX0.68LnlXQypTsM-Q-WQRK3jeUB2hoAGXgBVgOJ-WOq_zA';

// Cấu hình Axios headers
const axiosConfig = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
};

const scheduleService = {
    fetchItemsByUser: (phoneNumber) => {
        return axios.get(`${baseUrl}/schedules_by_user/${phoneNumber}`, axiosConfig);
    },

    addItem: (phoneNumber, item) => {
        return axios.post(`${baseUrl}/schedules/${phoneNumber}`, item, axiosConfig);
    },

    updateItem: (id, item) => {
        return axios.put(`${baseUrl}/schedules/${id}`, item, axiosConfig);
    },

    deleteItem: (id) => {
        return axios.delete(`${baseUrl}/schedules/${id}`, axiosConfig);
    },

    createLeave: (leave) => {
        return axios.post(`${baseUrl}/leave`, leave, axiosConfig);
    },

    getLeaveReasonByItem: (id) => {
        return axios.get(`${baseUrl}/leave?id=${id}`, axiosConfig);
    },

    getCheckExistReason: (itemId) => {
        return axios.get(`${baseUrl}/leave/checkItemExist/${itemId}`, axiosConfig);
    },
    acceptReason: (reasonId) => {
        return axios.put(`${baseUrl}/leave/acceptReason/${reasonId}`, reasonId, axiosConfig);
    },
    rejectReason: (reasonId) => {
        return axios.put(`${baseUrl}/leave/rejectReason/${reasonId}`, reasonId, axiosConfig);
    },
    countReason: (itemId) => {
        return axios.get(`${baseUrl}/leave/countReason/${itemId}`, axiosConfig);
    },
};

export default scheduleService;