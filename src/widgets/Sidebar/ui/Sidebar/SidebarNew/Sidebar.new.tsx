import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo, HStack, VStack } from '@/shared/ui';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { getSidebarItems } from '../../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

import cls from '../Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const SidebarNew = memo((props: SidebarProps) => {
    const { className } = props;
    const defaultCollapsed: boolean = JSON.parse(
        localStorage.getItem('defaultCollapsed') || 'false',
    );
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const sidebarItems = useSelector(getSidebarItems);

    const onToggle = useCallback((): void => {
        setCollapsed((prev) => {
            localStorage.setItem('defaultCollapsed', JSON.stringify(!prev));

            return !prev;
        });
    }, []);

    const itemsList = useMemo(
        () =>
            sidebarItems.map((sbItem) => (
                <SidebarItem
                    key={ sbItem.route }
                    item={ sbItem }
                    collapsed={ collapsed }
                />
            )),
        [collapsed, sidebarItems],
    );

    return (
        <aside
            data-testid="sb"
            className={ classNames(
                cls.SidebarRedesigned,
                { [cls.collapsedRedesigned]: collapsed },
                [className],
            ) }
        >
            <AppLogo size={ collapsed ? 30 : 50 } className={ cls.appLogo } />
            <VStack role="navigation" gap="8" className={ cls.items }>
                { itemsList }
            </VStack>
            <Icon
                data-testid="sb-toggle"
                onClick={ onToggle }
                Svg={ ArrowIcon }
                className={ cls.collapsedBtn }
                clickable
            />
            <HStack
                gap="16"
                align="center"
                justify="center"
                className={ classNames(cls.switchers) }
            >
                <ThemeSwitcher />
                <LangSwitcher className={ cls.lang } collapsed={ collapsed } />
            </HStack>
        </aside>
    );
});
