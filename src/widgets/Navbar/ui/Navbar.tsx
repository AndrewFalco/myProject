import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    FC, memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';

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
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={ classNames(cls.links, {}, []) }>
                <Button theme="clear" onClick={ authData ? onLogout : openModal }>
                    { authData ? t('Logout') : t('Login') }
                </Button>
            </div>
            { !authData && <LoginModal isOpen={ isAuthModal } onClose={ closeModal } /> }
        </div>
    );
};

export const Navbar = memo(NavbarComponent);
