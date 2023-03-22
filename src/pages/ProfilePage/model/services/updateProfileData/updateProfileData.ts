import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ProfileType } from '../../../../../entities/Profile/model/types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<ProfileType, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, restAPI) => {
        const { extra, rejectWithValue, getState } = restAPI;

        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put<ProfileType>(`/profile/${formData?.id}`, formData);

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with update profile data');
        }
    },
);
