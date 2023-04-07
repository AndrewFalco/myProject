import {
 MutableRefObject, memo, useCallback, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Text } from 'shared/ui';
import { Page } from 'widgets/Page/Page';
import { ArticleSort, ArticleSortField } from 'features/ArticleSort';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { SortOrder } from 'shared/types';
import { ArticleType } from 'entities/Article/model/types/article';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import {
    getArticlesPageError, getArticlesPageIsLoading, getArticlesPageLastIndex, getArticlesPageType, getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage';
import { fetchArticlesList } from '../model/services/fetchArticlesList';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string,
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const view = useSelector(getArticlesPageView);
    const type = useSelector(getArticlesPageType);
    const lastIndex = useSelector(getArticlesPageLastIndex);
    const [searchParams] = useSearchParams();
    const parentRef = useRef() as MutableRefObject<HTMLDivElement>;

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, view);
    }, [dispatch]);

    const onChangeSort = useCallback((sort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchData);
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((order: SortOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchData);
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1));
        dispatch(debouncedFetchData);
    }, [debouncedFetchData, dispatch]);

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(articlesPageActions.setType(tab.value as ArticleType));
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchData);
    }, [dispatch, fetchData]);

    // TODO: deal remember scroll position
    const onSetLastIndex = useCallback((index: number) => {
        dispatch(articlesPageActions.setLastIndex(index));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={ reducers } removeAfterUnmount={ false }>
            <Page className={ classNames(cls.ArticlesPage, {}, [className]) } parentRef={ parentRef }>
                {
                  !error
                    ? (
                        <>
                            <ArticleSort
                              onChangeView={ onChangeView }
                              onChangeSort={ onChangeSort }
                              onChangeOrder={ onChangeOrder }
                              onChangeSearch={ onChangeSearch }
                              onChangeType={ onChangeType }
                              view={ view }
                              typeValue={ type }
                            />
                            {
                                articles.length || isLoading
                                    ? (
                                        <ArticleList
                                          articles={ articles }
                                          isLoading={ isLoading }
                                          view={ view }
                                          onScrollEnd={ onLoadNextPart }
                                          parentRef={ parentRef }
                                          lastIndex={ lastIndex }
                                          setLastIndex={ onSetLastIndex }
                                        />
                                    )
                                    : <Text title={ t('No articles at the moment') } />
                            }
                        </>
                    )
                    : (
                        <div className={ cls.error }>
                            <Text title={ t(error || 'Error with articles loading') } theme="error" />
                        </div>
                    )
                }
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
