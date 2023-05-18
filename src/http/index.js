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

axiosInstance.interceptors.request.use(
    config => {
        const publicUrls = ['/api/users/', '/users/current/'];
        const isPublicUrl = publicUrls.some(url => config.url.includes(url));
        if (!isPublicUrl && !localStorage.getItem('user')) {
            store.dispatch(logout());
            return Promise.reject(new Error('No user in local storage'));
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.error('Unauthorized request: ', error);
            store.dispatch(logout());
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
);