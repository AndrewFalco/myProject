import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ArticleView, ArticleType } from '@/entities/Article';
import {
    ArticleSortField,
    getArticleOrderValue,
    getArticleSearchValue,
    getArticleSortValue,
} from '@/features/ArticleSort';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from '@/shared/consts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { SortOrder } from '@/shared/types/sort';
import { TabItem } from '@/shared/ui/redesigned/Tabs';
import {
    getArticlesPageView,
    getArticlesPageType,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';

interface UseArticlesFilter {
    view: ArticleView;
    type: ArticleType;
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
    onChangeView: (view: ArticleView) => void;
    onChangeSort: (sort: ArticleSortField) => void;
    onChangeOrder: (order: SortOrder) => void;
    onChangeSearch: (search: string) => void;
    onChangeType: (search: TabItem) => void;
}

export const useArticlesFilters = (): UseArticlesFilter => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const type = useSelector(getArticlesPageType);
    const sort = useSelector(getArticleSortValue);
    const order = useSelector(getArticleOrderValue);
    const search = useSelector(getArticleSearchValue);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);
    const debouncedFetchData = useDebounce(fetchData, 500);
    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, view);
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (sort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(sort));
            dispatch(articlesPageActions.setPage(1));
            dispatch(fetchData);
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(articlesPageActions.setOrder(order));
            dispatch(articlesPageActions.setPage(1));
            dispatch(fetchData);
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search));
            dispatch(articlesPageActions.setPage(1));
            dispatch(debouncedFetchData);
        },
        [debouncedFetchData, dispatch],
    );

    const onChangeType = useCallback(
        (tab: TabItem) => {
            dispatch(articlesPageActions.setType(tab.value as ArticleType));
            dispatch(articlesPageActions.setPage(1));
            dispatch(fetchData);
        },
        [dispatch, fetchData],
    );

    return {
        view,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
        sort,
        order,
        search,
    };
};
