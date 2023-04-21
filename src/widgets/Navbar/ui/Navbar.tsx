import {
    memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { AvatarDropdown } from 'features/avatarDropdown';
import { NotificationButton } from 'features/notificationButton';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    AppLink, Button, HStack, Text,
} from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

const NavbarComponent = (props: NavbarProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);

    const [isAuthModal, setIsAuthModal] = useState(false);

    const openModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <header className={ classNames(cls.Navbar, {}, [className]) }>
            <HStack justify="between" grow>
                <div className={ cls.controls }>
                    <Text title="FF" className={ cls.appName } />
                    { authData && (
                        <AppLink
                          className={ cls.appLink }
                          to={ RoutePath.articleCreate }
                        >
                            { t('Create new article') }
                        </AppLink>
                    ) }
                </div>
                {
                    authData
                        ? (
                            <HStack gap="16" className={ cls.actions }>
                                <NotificationButton />
                                <AvatarDropdown onCloseModal={ closeModal } />
                            </HStack>
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
