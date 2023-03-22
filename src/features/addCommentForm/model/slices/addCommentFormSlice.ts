import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = {
    text: undefined,
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(updateProfileData.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(updateProfileData.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //             state.form = action.payload;
    //             state.readonly = true;
    //         })
    //         .addCase(updateProfileData.rejected, (state, action) => {
    //             if (state.error) {
    //                 state.error.push({ key: 'loading', text: action.payload || 'Error with fetching profile data' });
    //             } else {
    //                 state.error = [{ key: 'loading', text: action.payload || 'Error with fetching profile data' }];
    //             }
    //             state.isLoading = false;
    //         });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
