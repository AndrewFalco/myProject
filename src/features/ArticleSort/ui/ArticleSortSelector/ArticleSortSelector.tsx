import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '../../model/types/articleSort';
import { ToggleFeature } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sortValue: ArticleSortField;
    orderValue: SortOrder;
    onChangeOrder: (value: SortOrder) => void;
    onChangeSort: (value: ArticleSortField) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const { className, sortValue, orderValue, onChangeOrder, onChangeSort } =
        props;
    const { t } = useTranslation('article');

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                content: t('asc'),
                value: 'asc',
            },
            {
                content: t('desc'),
                value: 'desc',
            },
        ],
        [t],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
        () => [
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
        ],
        [t],
    );

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <VStack
                    gap="8"
                    align="start"
                    justify="start"
                    className={ className }
                >
                    <Text title={ `${t('Sort by')}:` } size="sizeS" />
                    <ListBox
                        items={ orderOptions }
                        value={ orderValue }
                        onChange={ onChangeOrder }
                    />
                    <ListBox
                        items={ sortFieldOptions }
                        value={ sortValue }
                        onChange={ onChangeSort }
                    />
                </VStack>
            }
            off={
                <div
                    className={ classNames(cls.ArticleSortSelector, {}, [
                        className,
                    ]) }
                >
                    <Select
                        label={ `${t('Order by')}:` }
                        options={ orderOptions }
                        value={ orderValue }
                        onChange={ onChangeOrder }
                        className={ className }
                    />
                    <Select
                        label={ `${t('Sort by')}:` }
                        options={ sortFieldOptions }
                        value={ sortValue }
                        onChange={ onChangeSort }
                        className={ cls.order }
                    />
                </div>
            }
        />
    );
};
