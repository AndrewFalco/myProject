import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../../../../features/editableProfileCard/model/services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    data: undefined,
    error: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
            state.error = undefined;
        },
        setReadonly: (state, action) => {
            state.readonly = action.payload;
        },
        setError: (state, action: PayloadAction<{ key: string, text?: string }>) => {
            if (state.error) {
                state.error.push(
                    {
                        key: action.payload.key,
                        text: action.payload.text || 'Error with fetching profile data',
                    },
                );
            } else {
                state.error = [{ key: action.payload.key, text: action.payload.text || 'Error with fetching profile data' }];
            }
        },
        removeError: (state, action: PayloadAction<{ key: string}>) => {
            if (state.error?.length) {
                state.error = state.error.filter((err) => err.key !== action.payload.key);
            }
        },
        updateProfile: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                if (state.error) {
                    state.error.push({ key: 'loading', text: action.payload || 'Error with fetching profile data' });
                } else {
                    state.error = [{ key: 'loading', text: action.payload || 'Error with fetching profile data' }];
                }
                state.isLoading = false;
            })

            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                if (state.error) {
                    state.error.push({ key: 'loading', text: action.payload || 'Error with fetching profile data' });
                } else {
                    state.error = [{ key: 'loading', text: action.payload || 'Error with fetching profile data' }];
                }
                state.isLoading = false;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
