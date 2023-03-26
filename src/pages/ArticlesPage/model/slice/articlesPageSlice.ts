import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts';
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
        limit: 5,
        hasMore: true,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.limit = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) === 'LIST' ? 5 : 9;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchArticlesList.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<Article[]>) => {
            state.isLoading = false;
            articlesPageAdapter.addMany(state, action.payload);
            state.hasMore = action.payload.length > 0;
        })
        .addCase(fetchArticlesList.rejected, (state, action) => {
            state.error = action.payload || 'Error with fetching articles details data';
            state.isLoading = false;
        });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
