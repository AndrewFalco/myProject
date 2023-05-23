import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/redesigned/Card';
import {
    ArticleSortField,
    ArticleSortSelector,
    ArticleTypeTabs,
} from '@/features/ArticleSort';
import { TabItem, VStack } from '@/shared/ui/deprecated';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { ArticleType } from '@/entities/Article';
import { Input } from '@/shared/ui/redesigned/Input';
import { Icon } from '@/shared/ui/redesigned/Icon';
import Search from '@/shared/assets/icons/search.svg';

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
                    placeholder={ t('Search') || '' }
                    onChange={ onChangeSearch }
                    addonLeft={ <Icon Svg={ Search } /> }
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
