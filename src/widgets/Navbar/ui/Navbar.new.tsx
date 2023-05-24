import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserAuthData } from '@/entities/User';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './Navbar.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { LoginModal } from '@/features/AuthByUsername';

interface NavbarProps {
    className?: string;
}

export const NavbarNew = memo((props: NavbarProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const openModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <header className={ classNames(cls.NavbarRedesigned, {}, [className]) }>
            <HStack gap="16"
                    className={ cls.actions }
                    align="center"
                    justify="center">
                { authData ? (
                    <HStack gap="16" className={ cls.actions }>
                        <NotificationButton />
                        <AvatarDropdown onCloseModal={ closeModal } />
                    </HStack>
                ) : (
                    <Button variant="clear" onClick={ openModal }>
                        { t('Login') }
                    </Button>
                ) }
            </HStack>
            { !authData && <LoginModal isOpen={ isAuthModal } onClose={ closeModal } /> }
        </header>
    );
});
