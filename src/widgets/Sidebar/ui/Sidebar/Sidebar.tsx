import {
    memo, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import { SidebarItems } from 'widgets/Sidebar/model/items';
import cls from './Sidebar.module.scss';
import { SidebarItem } from './SidebarItem';

interface SidebarProps {
    className?: string,
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);

    const onToggle = useCallback((): void => {
        setCollapsed((prev) => !prev);
    }, []);

    return (
        <div
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
            <div className={ cls.items }>
                {
                    SidebarItems.map((sbItem) => (
                        <SidebarItem
                          key={ sbItem.route }
                          item={ sbItem }
                          collapsed={ collapsed }
                        />
                    ))
                }
            </div>
            <div className={ classNames(cls.switchers) }>
                <ThemeSwitcher />
                <LangSwitcher className={ cls.lang } collapsed={ collapsed } />
            </div>
        </div>
    );
});
