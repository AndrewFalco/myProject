import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProfileType } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<ProfileType, string, ThunkConfig<string>>(
    'feature/fetchProfileData',
    async (profileId, restAPI) => {
        const { extra, rejectWithValue } = restAPI;

        try {
            const response = await extra.api.get<ProfileType>(`/profile/${profileId}`);

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with data loading');
        }
    },
);
