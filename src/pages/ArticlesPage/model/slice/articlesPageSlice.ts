import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';
import { ArticleSortField } from 'features/ArticleSort';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../services/fetchArticlesList';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

const articlesPageAdapter = createEntityAdapter<Article>({
    selectId: (articles) => articles.id,
});

export const getArticles = articlesPageAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesPageAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesPageAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: 'GRID',
        page: 1,
        limit: 9,
        hasMore: true,
        _inited: false,
        search: '',
        sort: 'createAt',
        order: 'asc',
        type: 'ALL',
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setType: (state, action: PayloadAction<ArticleType>) => {
            state.type = action.payload;
        },
        initState: (state) => {
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.limit = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) === 'LIST' ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchArticlesList.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;

            if (action.meta.arg.replace) {
                articlesPageAdapter.removeAll(state);
            }
        })
        .addCase(fetchArticlesList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasMore = action.payload.length >= state.limit;

            if (action.meta.arg.replace) {
                if (action.payload.length) {
                    articlesPageAdapter.setAll(state, action.payload);
                } else {
                    articlesPageAdapter.removeAll(state);
                }
            } else {
                articlesPageAdapter.addMany(state, action.payload);
            }
        })
        .addCase(fetchArticlesList.rejected, (state, action) => {
            state.error = action.payload || 'Error with fetching articles details data';
            state.isLoading = false;
        });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
