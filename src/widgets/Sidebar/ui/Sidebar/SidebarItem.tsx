import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui';
import { SidebarListProps } from 'widgets/Sidebar/model/items';

import cls from './Sidebar.module.scss';

interface SidebarItemProps {
    item: SidebarListProps,
    collapsed?: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();

    return (
        <AppLink
            to={ RoutePath[item.route] }
            theme="secondary"
            className={ classNames(cls.item, { [cls.collapsed]: collapsed }) }
        >
            <item.Icon className={ cls.icon } />
            <span className={ cls.link }>{ t(item.name) }</span>
        </AppLink>
    );
});
