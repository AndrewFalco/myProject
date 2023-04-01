import { useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui';
import { SelectOption } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'features/ArticleSort';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string,
    sortValue: ArticleSortField,
    orderValue: SortOrder,
    onChangeOrder: (value: SortOrder) => void,
    onChangeSort: (value: ArticleSortField) => void,
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className, sortValue, orderValue, onChangeOrder, onChangeSort,
    } = props;
    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            content: t('asc'),
            value: 'asc',
        },
        {
            content: t('desc'),
            value: 'desc',
        },
    ], [t]);

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(() => [
        {
            value: 'createAt',
            content: t('createAt'),
        },
        {
            value: 'title',
            content: t('title'),
        },
        {
            value: 'views',
            content: t('views'),
        },
    ], [t]);

    return (
        <div className={ classNames(cls.ArticleSortSelector, {}, [className]) }>
            <Select
              label={ t('Order by') }
              options={ orderOptions }
              value={ orderValue }
              onChange={ onChangeOrder }
            />
            <Select
              label={ t('Sort by') }
              options={ sortFieldOptions }
              value={ sortValue }
              onChange={ onChangeSort }
              className={ cls.order }
            />
        </div>
    );
};
