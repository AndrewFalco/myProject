import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';
import { getAddCommentFormText } from '../selectors/addCommentFormSelector';
import { addCommentFormActions } from '../slices/addCommentFormSlice';

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
    'addCommentForm/sendComment',
    async (_, restAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = restAPI;

        const userData = getUserAuthData(getState());
        const text = getAddCommentFormText(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });
            dispatch(addCommentFormActions.setText(''));

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with send comment');
        }
    },
);
