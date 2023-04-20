import {
    memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isResolvedRole, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    AppLink, Avatar, Button, HStack, Text, Dropdown,
} from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

const NavbarComponent = (props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdminPanelAvailable = useSelector((state) => isResolvedRole(state, ['ADMIN', 'MANAGER']));

    const [isAuthModal, setIsAuthModal] = useState(false);

    const openModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        setIsAuthModal(false);
    }, [dispatch]);

    const closeModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <header className={ classNames(cls.Navbar, {}, [className]) }>
            <HStack justify="between" grow>
                <div className={ cls.controls }>
                    <Text title="FF" className={ cls.appName } />
                    <AppLink
                      className={ cls.appLink }
                      to={ RoutePath.articleCreate }
                    >
                        { t('Create new article') }
                    </AppLink>
                </div>
                {
                    authData
                        ? (
                            <Dropdown
                              items={ [
                                    ...(isAdminPanelAvailable ? [{
                                        content: t('Admin profile'),
                                        href: RoutePath.adminPanel,
                                    }] : []),
                                    {
                                        content: t('Profile'),
                                        href: RoutePath.profile + authData.id,
                                    },
                                    {
                                        content: t('Logout'),
                                        onClick: onLogout,
                                    },
                                ] }
                              trigger={ <Avatar src={ authData.avatar } size={ 30 } /> }
                              className={ cls.dropdown }
                              direction="bottom left"
                            />
                        )
                        : (
                            <Button theme="clear" onClick={ openModal }>
                                { t('Login') }
                            </Button>
                        )
                }
            </HStack>
            { !authData && <LoginModal isOpen={ isAuthModal } onClose={ closeModal } /> }
        </header>
    );
};

export const Navbar = memo(NavbarComponent);
