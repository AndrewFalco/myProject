import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleTypeTabs,
} from '@/features/ArticleSort';
import { Input, TabItem, VStack } from '@/shared/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { ArticleType } from '@/entities/Article';

import cls from './ArticleFilters.module.scss';

interface ArticleFiltersProps {
    className?: string;
    order: SortOrder;
    search: string;
    sort: ArticleSortField;
    typeValue: ArticleType;
    onChangeSort: (sort: ArticleSortField) => void;
    onChangeOrder: (order: SortOrder) => void;
    onChangeSearch: (search: string) => void;
    onChangeType: (search: TabItem) => void;
}

export const ArticleFilters = (props: ArticleFiltersProps) => {
    const {
        className,
        sort,
        order,
        search,
        typeValue,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
    } = props;
    const { t } = useTranslation();

    return (
        <Card
            className={ classNames(cls.ArticlesFilter, {}, [className]) }
            padding="24"
        >
            <VStack gap="32">
                <Input
                    className={ cls.searchInput }
                    name={ t('Search') }
                    onChange={ onChangeSearch }
                    value={ search }
                />
                <ArticleTypeTabs
                    onChangeType={ onChangeType }
                    typeValue={ typeValue }
                />
                <ArticleSortSelector
                    orderValue={ order }
                    sortValue={ sort }
                    onChangeOrder={ onChangeOrder }
                    onChangeSort={ onChangeSort }
                />
            </VStack>
        </Card>
    );
};
