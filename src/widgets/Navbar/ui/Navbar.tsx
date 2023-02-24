import { LoginModal } from 'features/AuthByUsername';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const openModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={ classNames(cls.links, {}, []) }>
                <Button theme="clear" onClick={ openModal }>
                    { t('Login') }
                </Button>
            </div>
            <LoginModal isOpen={ isAuthModal } onClose={ closeModal } />
        </div>
    );
};
