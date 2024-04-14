// File: services/scheduleService.js
import axios from 'axios';

const baseUrl = 'http://192.168.82.4:8080';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6IjEyMyIsInN1YiI6IjEyMyIsImV4cCI6MTcxNDg5NjQ1NH0.s1GRzGW4JYPLu2iwOFrhBYAJtX82BgCEx6MRsE4wBrI';

// Cấu hình Axios headers
const axiosConfig = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
};

const scheduleService = {
    fetchItems: async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/schedules`, axiosConfig);
            console.log(JSON.stringify(response.data))
            return response.data;
        } catch (error) {
            console.error('Error fetching schedules:', error);
            throw error;
        }
    },

    addItem: async (item) => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/schedules`, item, axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error adding item:', error);
            throw error;
        }
    },

    updateItem: async (id, item) => {
        try {
            const response = await axios.put(`${baseUrl}/api/v1/schedules/${id}`, item, axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    },
    deleteItem: async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/api/v1/schedules/${id}`, axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    },
    createLeave: async (leave) => {
        try {
            const response = await axios.post(`${baseUrl}/api/v1/leave`,leave, axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error create leave:', error);
            throw error;
        }
    },
    getLeaveReasonByItem: async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/api/v1/leave?id=${id}`, axiosConfig);
            return response.data;
        } catch (error) {
            console.error('Error get leave reason:', error);
            throw error;
        }
    },
};

export default scheduleService;