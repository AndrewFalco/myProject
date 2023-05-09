import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Card, HStack, Input, VStack, TabItem } from '@/shared/ui';
import { SortOrder } from '@/shared/types/sort';
import { ArticleType, ArticleView } from '@/entities/Article';
import {
    getArticleOrderValue,
    getArticleSearchValue,
    getArticleSortValue,
} from '../../model/selectors/articleSortSelectors';
import { ArticleSortField } from '../../model/types/articleSort';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleViewSelector } from '../ArticleViewSelector/ArticleViewSelector';

import cls from './ArticleSort.module.scss';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';

interface ArticleSortProps {
    view: ArticleView;
    typeValue: ArticleType;
    onChangeView: (view: ArticleView) => void;
    onChangeSort: (sort: ArticleSortField) => void;
    onChangeOrder: (order: SortOrder) => void;
    onChangeSearch: (search: string) => void;
    onChangeType: (search: TabItem) => void;
}

export const ArticleSort = (props: ArticleSortProps) => {
    const {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeView,
        view,
        typeValue,
        onChangeType,
    } = props;
    const { t } = useTranslation();
    const sort = useSelector(getArticleSortValue);
    const order = useSelector(getArticleOrderValue);
    const search = useSelector(getArticleSearchValue);

    return (
        <VStack className={ cls.sortWrapper }>
            <HStack justify="between" gap="8" max>
                <HStack justify="between" grow>
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
                </HStack>
                <ArticleViewSelector view={ view } onViewClick={ onChangeView } />
            </HStack>
            <ArticleTypeTabs
                onChangeType={ onChangeType }
                typeValue={ typeValue }
            />
        </VStack>
    );
};
