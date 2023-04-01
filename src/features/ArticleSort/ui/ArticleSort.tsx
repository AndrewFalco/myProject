import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card, Input, Tabs } from 'shared/ui';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types';
import { ArticleSortSelector, ArticleView, ArticleViewSelector } from 'entities/Article';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { useMemo } from 'react';
import { ArticleType } from 'entities/Article/model/types/article';
import { getArticleOrderValue, getArticleSearchValue, getArticleSortValue } from '../model/selectors/articleSortSelectors';
import { ArticleSortField } from '../model/types/articleSort';

import cls from './ArticleSort.module.scss';

interface ArticleSortProps {
    className?: string,
    view: ArticleView,
    typeValue: ArticleType,
    onChangeView: (view: ArticleView) => void,
    onChangeSort: (sort: ArticleSortField) => void,
    onChangeOrder: (order: SortOrder) => void,
    onChangeSearch: (search: string) => void,
    onChangeType: (search: TabItem) => void,
}

export const ArticleSort = (props: ArticleSortProps) => {
    const {
        className, onChangeOrder, onChangeSearch, onChangeSort,
        onChangeView, view, typeValue, onChangeType,
    } = props;
    const { t } = useTranslation();
    const sort = useSelector(getArticleSortValue);
    const order = useSelector(getArticleOrderValue);
    const search = useSelector(getArticleSearchValue);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: 'ALL',
            content: t('ALL'),
        },
        {
            value: 'IT',
            content: t('IT'),
        },
        {
            value: 'SCIENCE',
            content: t('SCIENCE'),
        },
    ], [t]);

    return (
        <div className={ classNames(cls.ArticleSort, {}, [className]) }>
            <div className={ cls.sortWrapper }>
                <div className={ cls.searchWrapper }>
                    <ArticleSortSelector
                      orderValue={ order }
                      sortValue={ sort }
                      onChangeOrder={ onChangeOrder }
                      onChangeSort={ onChangeSort }
                    />
                    <Card className={ cls.searchCard }>
                        <Input
                          className={ cls.searchInput }
                          name={ t('Search') }
                          onChange={ onChangeSearch }
                          value={ search }
                        />
                    </Card>
                </div>
                <ArticleViewSelector
                  view={ view }
                  onViewClick={ onChangeView }
                  className={ cls.viewSelectors }
                />
            </div>
            <Tabs
              tabs={ typeTabs }
              value={ typeValue }
              onTabClick={ onChangeType }
              className={ cls.tabs }
            />
        </div>
    );
};
