import { MutableRefObject, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleList } from '@/entities/Article';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
    getArticlesPageLastIndex,
} from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage';
import {
    getArticles,
    articlesPageActions,
} from '../../model/slice/articlesPageSlice';

interface ArticlePageListProps {
    parentRef: MutableRefObject<HTMLDivElement>;
}

export const ArticlePageList = (props: ArticlePageListProps) => {
    const { parentRef } = props;
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const lastIndex = useSelector(getArticlesPageLastIndex);

    const onSetLastIndex = useCallback(
        (index: number) => {
            dispatch(articlesPageActions.setLastIndex(index));
        },
        [dispatch],
    );

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    return articles.length || isLoading ? (
        <ArticleList
            articles={ articles }
            isLoading={ isLoading }
            view={ view }
            onScrollEnd={ onLoadNextPart }
            parentRef={ parentRef }
            lastIndex={ lastIndex }
            setLastIndex={ onSetLastIndex }
        />
    ) : (
        <Text title={ t('No articles at the moment') } />
    );
};
