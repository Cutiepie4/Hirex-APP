// File: services/scheduleService.js
import { BASE_URL } from '@/config/config';
import { store } from '@/redux/store/store';
import { BASE_API } from './BaseApi';

// const baseUrl = `${BASE_URL}`;
// const token = store.getState().authReducer.access_token;
// console.log(token)

// // Cấu hình Axios headers
// const axiosConfig = {
//     headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//     },
// };

const scheduleService = {
    fetchItemsByUser: (phoneNumber, dateStart, dateEnd) => {
        return BASE_API.get(`/schedules_by_user/${phoneNumber}/${dateStart}/${dateEnd}`);
    },
    fetchMarkDate: (phoneNumber) => {
        return BASE_API.get(`/mark-date/${phoneNumber}`);
    },
    addItem: (phoneNumber, item) => {
        return BASE_API.post(`/schedules/${phoneNumber}`, item);
    },

    updateItem: (id, item) => {
        return BASE_API.put(`/schedules/${id}`, item);
    },

    deleteItem: (id) => {
        return BASE_API.delete(`/schedules/${id}`);
    },

    createLeave: (leave) => {
        return BASE_API.post(`/leave`, leave);
    },

    getLeaveReasonByItem: (work_id, date) => {
        return BASE_API.get(`/leave/${work_id}/${date}`);
    },

    getCheckExistReason: (work_id, date) => {
        return BASE_API.get(`/leave/checkItemExist/${work_id}/${date}`);
    },
    acceptReason: (reasonId) => {
        return BASE_API.put(`/leave/acceptReason/${reasonId}`, reasonId);
    },
    rejectReason: (reasonId) => {
        return BASE_API.put(`/leave/rejectReason/${reasonId}`, reasonId);
    },
    countReason: (work_id, date) => {
        return BASE_API.get(`/leave/countReason/${work_id}/${date}`);
    },
};

export default scheduleService;