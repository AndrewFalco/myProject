import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, HStack } from '@/shared/ui';
import { SidebarListProps } from '../../model/types/sidebar';

import cls from './Sidebar.module.scss';

interface SidebarItemProps {
    item: SidebarListProps;
    collapsed?: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();

    const isAuth = useSelector(getUserAuthData);

    return item.authOnly && !isAuth ? null : (
        <AppLink
            to={ item.route }
            theme="secondary"
            className={ classNames(cls.item, { [cls.collapsed]: collapsed }) }
        >
            <HStack>
                <item.Icon className={ cls.icon } />
                <span className={ cls.link }>{ t(item.name) }</span>
            </HStack>
        </AppLink>
    );
});
