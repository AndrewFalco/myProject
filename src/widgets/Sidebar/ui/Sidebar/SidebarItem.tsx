import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkOld } from '@/shared/ui/deprecated/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { SidebarListProps } from '../../model/types/sidebar';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';

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
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <AppLink
                    to={ item.route }
                    className={ classNames(cls.itemRedesigned, { [cls.collapsedRedesigned]: collapsed }) }
                    activeClassName={ cls.active }
                >
                    <HStack justify="center" align="center">
                        <Icon Svg={ item.Icon }
                              width={ 32 }
                              height={ 32 } />
                        <span className={ cls.link }>{ t(item.name) }</span>
                    </HStack>
                </AppLink>
            }
            off={
                <AppLinkOld to={ item.route }
                            theme="secondary"
                            className={ classNames(cls.item, { [cls.collapsed]: collapsed }) }>
                    <HStack>
                        <item.Icon className={ cls.icon } />
                        <span className={ cls.link }>{ t(item.name) }</span>
                    </HStack>
                </AppLinkOld>
            }
        />
    );
});
