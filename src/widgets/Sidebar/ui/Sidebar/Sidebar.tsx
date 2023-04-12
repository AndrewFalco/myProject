import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

import cls from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
    className?: string,
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItems = useSelector(getSidebarItems);

    const onToggle = useCallback((): void => {
        setCollapsed((prev) => !prev);
    }, []);

    const itemsList = useMemo(() => sidebarItems.map((sbItem) => (
        <SidebarItem
          key={ sbItem.route }
          item={ sbItem }
          collapsed={ collapsed }
        />
    )), [collapsed, sidebarItems]);

    return (
        <aside
          data-testid="sb"
          className={ classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className]) }
        >
            <Button
              data-testid="sb-toggle"
              onClick={ onToggle }
              className={ classNames(cls.collapsedBtn) }
              theme="backgroundInverted"
              square
              size="sizeL"
            >
                { collapsed ? '>' : '<' }
            </Button>
            <VStack role="navigation" gap="8" className={ cls.items }>
                { itemsList }
            </VStack>
            <VStack gap="8" align="center" className={ classNames(cls.switchers) }>
                <ThemeSwitcher />
                <LangSwitcher className={ cls.lang } collapsed={ collapsed } />
            </VStack>
        </aside>
    );
});
