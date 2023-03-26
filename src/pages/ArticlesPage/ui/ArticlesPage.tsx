import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Page, Text } from 'shared/ui';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts';
import { fetchArticlesList } from '../model/services/fetchArticlesList';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import {
  getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage';

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

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, view);
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
          dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({
            page: 1,
        }));
    });

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <Page
              onScrollEnd={ onLoadNextPart }
              className={ classNames(cls.ArticlesPage, {}, [className]) }
            >
                {
                  !error
                    ? (
                        <>
                            <ArticleViewSelector
                              view={ view }
                              onViewClick={ onChangeView }
                              className={ cls.viewSelectors }
                            />
                            <ArticleList articles={ articles } isLoading={ isLoading } view={ view } />
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
