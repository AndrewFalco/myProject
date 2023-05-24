import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { getUserAuthData, isResolvedRole, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeature } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/consts/routes';

import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string;
    onCloseModal?: () => void;
}

export const AvatarDropdown = (props: AvatarDropdownProps) => {
    const { className, onCloseModal } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const isAdminPanelAvailable = useSelector((state) => isResolvedRole(state, ['ADMIN', 'MANAGER']));

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        onCloseModal?.();
    }, [dispatch, onCloseModal]);

    const items = [
        ...(isAdminPanelAvailable
            ? [
                  {
                      content: t('Admin profile'),
                      href: getRouteAdminPanel(),
                  },
              ]
            : []),
        {
            content: t('Profile'),
            href: getRouteProfile(authData?.id || ''),
        },
        {
            content: t('Settings'),
            href: getRouteSettings(),
        },
        {
            content: t('Logout'),
            onClick: onLogout,
        },
    ];

    return authData ? (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Dropdown
                    items={ items }
                    trigger={ <Avatar src={ authData.avatar } size={ 40 } /> }
                    direction="bottom left"
                    className={ classNames('', {}, [className]) }
                />
            }
            off={
                <DropdownDeprecated
                    items={ items }
                    trigger={ <AvatarDeprecated src={ authData.avatar } size={ 30 } /> }
                    direction="bottom left"
                    className={ classNames(cls.AvatarDropdown, {}, [className]) }
                />
            }
        />
    ) : null;
};
