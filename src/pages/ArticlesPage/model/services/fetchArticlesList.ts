import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesList = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (_, restAPI) => {
        const { extra, rejectWithValue } = restAPI;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with data loading');
        }
    },
);
