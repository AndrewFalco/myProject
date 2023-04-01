import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
 getArticleOrderValue, getArticleSearchValue, getArticleSortValue, getArticleType,
} from 'features/ArticleSort';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getArticlesPageLimit, getArticlesPageNum } from '../selectors/articlesPageSelectors';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<Article[], FetchArticlesListProps, ThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, restAPI) => {
        const { extra, rejectWithValue, getState } = restAPI;
        const page = getArticlesPageNum(getState());
        const limit = getArticlesPageLimit(getState());
        const sort = getArticleSortValue(getState());
        const order = getArticleOrderValue(getState());
        const search = getArticleSearchValue(getState());
        const type = getArticleType(getState());

        try {
            addQueryParams({
                sort, order, search, type,
            });
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    type: type === 'ALL' ? undefined : type,
                    q: search,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue('Error with data loading');
        }
    },
);
