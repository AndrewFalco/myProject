import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeature } from '@/shared/lib/features';
import { TabItem, Tabs } from '@/shared/ui/redesigned/Tabs';

import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
    className?: string;
    onChangeType: (search: TabItem) => void;
    typeValue: ArticleType;
}

export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { className, onChangeType, typeValue } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
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
        ],
        [t],
    );

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Tabs
                    tabs={ typeTabs }
                    value={ typeValue }
                    onTabClick={ onChangeType }
                    className={ className }
                    direction="column"
                />
            }
            off={
                <TabsDeprecated
                    tabs={ typeTabs }
                    value={ typeValue }
                    onTabClick={ onChangeType }
                    className={ classNames(cls.tabs, {}, [className]) }
                />
            }
        />
    );
};
