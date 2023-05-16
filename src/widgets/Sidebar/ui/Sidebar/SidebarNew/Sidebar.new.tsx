import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo, VStack } from '@/shared/ui';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { getSidebarItems } from '../../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem';
import { LangSwitcher } from '@/features/LangSwitcher';

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
            className={ classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [className]) }
        >
            <AppLogo className={ cls.appLogo }/>
            <VStack role="navigation" gap="8" className={ cls.items }>
                { itemsList }
            </VStack>
            <VStack
                gap="8"
                align="center"
                className={ classNames(cls.switchers) }
            >
                <ThemeSwitcher />
                <LangSwitcher className={ cls.lang } collapsed={ collapsed } />
            </VStack>
        </aside>
    );
});
