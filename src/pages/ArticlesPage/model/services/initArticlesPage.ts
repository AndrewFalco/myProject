import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField } from '@/features/ArticleSort';
import { SortOrder } from '@/shared/types';
import { ArticleType } from '@/entities/Article/model/types/article';
import { getArticlesPageInited } from '../selectors/articlesPageSelectors';
import { articlesPageActions } from '../slice/articlesPageSlice';
import { fetchArticlesList } from './fetchArticlesList';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (params, restAPI) => {
        const { dispatch, getState } = restAPI;
        const inited = getArticlesPageInited(getState());

        if (!inited) {
            params.forEach((key, value) => {
                switch (true) {
                    case value === 'order': dispatch(articlesPageActions.setOrder(key as SortOrder)); break;
                    case value === 'sort': dispatch(articlesPageActions.setSort(key as ArticleSortField)); break;
                    case value === 'search': dispatch(articlesPageActions.setSearch(key)); break;
                    case value === 'type': dispatch(articlesPageActions.setType(key as ArticleType)); break;
                    default: break;
                }
            });

            dispatch(articlesPageActions.initState());
        }
        dispatch(fetchArticlesList({}));
    },
);
