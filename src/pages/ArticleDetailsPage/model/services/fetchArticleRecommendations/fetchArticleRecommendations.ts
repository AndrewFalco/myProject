import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticlesRecommendations = createAsyncThunk<Article[], void, ThunkConfig<string>>(
    'articlesDetailsPage/fetchArticlesRecommendations',
    async (_, restAPI) => {
        const { extra, rejectWithValue } = restAPI;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 9,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with data loading');
        }
    },
);
