import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (requestData, loginAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', requestData);

            if (!response.data) {
                throw new Error('Response is empty');
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response));
            loginAPI.dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (error) {
            return loginAPI.rejectWithValue('Invalid username or password');
        }
    },
);
