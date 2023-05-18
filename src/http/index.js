import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/auth/authSlice';


export const axiosInstance = axios.create({
    baseURL: '/api',
})

export const setAuthCredentials = (username, password) => {
    const authString = btoa(username + ':' + password);
    axiosInstance.defaults.headers.common['Authorization'] = `Basic ${authString}`;
    return authString
}

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (!localStorage.getItem('user')) {
            store.dispatch(logout())
            return Promise.reject(error)
        }
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.error('Unauthorized request: ', error);
            store.dispatch(logout());
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
);