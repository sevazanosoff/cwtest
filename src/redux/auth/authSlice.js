import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './asyncActions';


const authSlice = createSlice({

    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;

        },
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;




