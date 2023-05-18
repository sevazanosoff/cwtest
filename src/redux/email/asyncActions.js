import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../http'



export const sendEmail = createAsyncThunk(
    'email/sendEmail',
    async (email) => {
        const response = await axiosInstance.post('/emails/', {
            ...email,
        });
        return response.data;
    }
)

export const fetchEmails = createAsyncThunk(
    'email/fetchEmails',
    async (url) => {
        const response = await axiosInstance.get(url)
        return response.data
    }
)

export const fetchEmailById = createAsyncThunk(
    'email/fetchEmailById',
    async (id) => {
        const response = await axiosInstance.get(`/emails/${id}/`)
        return response.data
    }
)

export const deleteEmail = createAsyncThunk('email/deleteEmail', async (id) => {
    await axiosInstance.delete(`/emails/${id}/`)
    return id
})

