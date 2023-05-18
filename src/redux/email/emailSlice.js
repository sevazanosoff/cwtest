import { createSlice } from '@reduxjs/toolkit'
import { deleteEmail, fetchEmailById, fetchEmails, sendEmail } from './asyncActions';

const initialState = {
    status: 'idle',
    error: null,
    emails: [],
    selectedEmail: {},
    selectedEmailStatus: 'idle',
    currentUrl: `/emails/?limit=5&offset=0`,
    next: null,
    previous: null,
    count: 0,
    page: 1,
    limit: 5,

}

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchEmails
            .addCase(fetchEmails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.emails = action.payload.results;
                state.next = action.payload.next;
                state.previous = action.payload.previous;
                state.count = action.payload.count;
            })
            .addCase(fetchEmails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // fetchEmailById
            .addCase(fetchEmailById.pending, (state) => {
                state.selectedEmailStatus = 'loading';
            })
            .addCase(fetchEmailById.fulfilled, (state, action) => {
                state.selectedEmail = action.payload;
                state.selectedEmailStatus = 'succeeded';
            })
            .addCase(fetchEmailById.rejected, (state, action) => {
                state.selectedEmailStatus = 'failed';
                state.error = action.error.message;
            })
            // sendEmail
            .addCase(sendEmail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.emails.push(action.payload);
                state.count += 1;
                if (state.emails.length > state.limit) {
                    state.emails.shift();
                }
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // deleteEmail
            .addCase(deleteEmail.fulfilled, (state, action) => {
                state.emails = state.emails.filter(email => email.id !== action.payload)
                state.count -= 1;
                if (state.emails.length === 0 && state.page > 1) {
                    state.page -= 1;
                }
            })
    },
})

export const { setPage } = emailSlice.actions;

export default emailSlice.reducer