import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs } from '@/shared/ui';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
    className?: string,
    onChangeType: (search: TabItem) => void,
    typeValue: ArticleType,
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, onChangeType, typeValue } = props;
    const { t } = useTranslation();

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
        {
            value: 'ECONOMICS',
            content: t('ECONOMICS'),
        },
        {
            value: 'GAMES',
            content: t('GAMES'),
        },
        {
            value: 'PHILOSOPHY',
            content: t('PHILOSOPHY'),
        },
    ], [t]);

    return (
        <Tabs
          tabs={ typeTabs }
          value={ typeValue }
          onTabClick={ onChangeType }
          className={ classNames(cls.tabs, {}, [className]) }
        />
    );
};
