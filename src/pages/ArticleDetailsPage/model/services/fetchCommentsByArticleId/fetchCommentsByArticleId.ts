import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { CommentType } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<CommentType[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, restAPI) => {
        const { extra, rejectWithValue } = restAPI;

        if (!articleId) {
            return rejectWithValue('Article is not found');
        }

        try {
            const response = await extra.api.get<CommentType[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with data loading');
        }
    },
);
