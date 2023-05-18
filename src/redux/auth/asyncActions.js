import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance, setAuthCredentials } from '../../http';

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const response = await axios.post('/api/users/', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user')
        }
        const savedUserData = {
            ...response.data,
        }
        localStorage.setItem('user', JSON.stringify(savedUserData))
        const authString = setAuthCredentials(user.username, user.password);
        const loginResponse = await axiosInstance.get('/users/current/')
        if (loginResponse.status === 200) {
            const savedUserData = {
                ...loginResponse.data,
                authString,
            }
            localStorage.setItem('user', JSON.stringify(savedUserData));
        }

        return loginResponse.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        const authString = setAuthCredentials(user.username, user.password);
        const response = await axiosInstance.get('/users/current/')
        if (response.status === 200) {
            const savedUserData = {
                ...response.data,
                authString,
            }
            localStorage.setItem('user', JSON.stringify(savedUserData));
            return savedUserData;
        } else {
            return thunkAPI.rejectWithValue({ message: 'Invalid username or password' })
        }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
})