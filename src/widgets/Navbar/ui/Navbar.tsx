import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, Button, Text } from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

const NavbarComponent: FC<NavbarProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

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
            <div className={ cls.links }>
                <div className={ cls.controls }>
                    <Text title="FF" className={ cls.appName } />
                    <AppLink
                      className={ cls.appLink }
                      to={ RoutePath.articleCreate }
                    >
                        { t('Create new article') }
                    </AppLink>
                </div>
                <Button theme="clear" onClick={ authData ? onLogout : openModal }>
                    { authData ? t('Logout') : t('Login') }
                </Button>
            </div>
            { !authData && <LoginModal isOpen={ isAuthModal } onClose={ closeModal } /> }
        </header>
    );
};

export const Navbar = memo(NavbarComponent);
