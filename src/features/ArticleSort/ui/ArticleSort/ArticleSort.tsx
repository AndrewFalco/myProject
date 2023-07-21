import { useTranslation } from 'react-i18next';
import { Card, Input, TabItem } from '@/shared/ui/deprecated';
import { SortOrder } from '@/shared/types/sort';
import { ArticleType, ArticleView } from '@/entities/Article';
import { ArticleSortField } from '../../model/types/articleSort';
import { ArticleSortSelector } from '../ArticleSortSelector/ArticleSortSelector';
import { ArticleViewSelector } from '../ArticleViewSelector/ArticleViewSelector';
import { ArticleTypeTabs } from '../ArticleTypeTabs/ArticleTypeTabs';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleSort.module.scss';

interface ArticleSortProps {
    sort: ArticleSortField;
    order: SortOrder;
    search: string;
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
        order,
        search,
        sort,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack className={ cls.sortWrapper }>
            <HStack justify="between"
                    gap="8"
                    max>
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
