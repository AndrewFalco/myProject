import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetailsData/getArticleDetailsData';
import { CommentType } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<CommentType, string, ThunkConfig<string>>(
    'articleDetails/sendComment',
    async (text, restAPI) => {
        const {
            extra, rejectWithValue, dispatch, getState,
        } = restAPI;

        const userData = getUserAuthData(getState());
        const article = getArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<CommentType>('/comments', {
                articleId: article.id,
                userId: userData.id,
                date: new Date().toISOString(),
                text,
            });

            dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with send comment');
        }
    },
);
