import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getJsonSettings, getUserAuthData } from '../selectors/userSelectors';
import { setJsonSettings } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (jsonSettings, restAPI) => {
    const { rejectWithValue, getState, dispatch } = restAPI;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('User data not found');
    }

    try {
        const response = await dispatch(
            setJsonSettings({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...jsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('JSON settings not found');
        }

        return response.jsonSettings;
    } catch (error) {
        return rejectWithValue('Error with data patching');
    }
});
