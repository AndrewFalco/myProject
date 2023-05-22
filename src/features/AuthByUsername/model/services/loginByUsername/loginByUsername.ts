import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (requestData, loginAPI) => {
    const { extra, dispatch, rejectWithValue } = loginAPI;

    try {
        const response = await extra.api.post<User>('/login', requestData);

        if (!response.data) {
            throw new Error('Response is empty');
        }

        localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.id);
        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (error) {
        return rejectWithValue('Invalid username or password');
    }
});
