import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from '../redux/auth/authSlice';
import emailReducer from '../redux/email/emailSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    email: emailReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;