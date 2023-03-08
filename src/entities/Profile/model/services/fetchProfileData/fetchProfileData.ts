import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProfileType } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<ProfileType, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, restAPI) => {
        const { extra, rejectWithValue } = restAPI;

        try {
            const response = await extra.api.get<ProfileType>('/profile');

            return response.data;
        } catch (error) {
            return rejectWithValue('Invalid username or password');
        }
    },
);
