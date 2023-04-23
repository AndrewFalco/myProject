import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown, Avatar } from '@/shared/ui';
import { getUserAuthData, isResolvedRole, userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string,
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

    return (
        authData
        ? (
            <Dropdown
              items={
                [
                    ...(isAdminPanelAvailable ? [{
                        content: t('Admin profile'),
                        href: '/admin',
                    }] : []),
                    {
                        content: t('Profile'),
                        href: `/profile${authData.id}`,
                    },
                    {
                        content: t('Logout'),
                        onClick: onLogout,
                    },
                ]
            }
              trigger={ <Avatar src={ authData.avatar } size={ 30 } /> }
              direction="bottom left"
              className={ classNames(cls.AvatarDropdown, {}, [className]) }
            />
        )
        : null
    );
};
