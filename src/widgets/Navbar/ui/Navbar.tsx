import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, Modal } from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    return (
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={ classNames(cls.links, {}, []) }>
                <Button theme="clear" onClick={ onToggleModal }>
                    { t('Login') }
                </Button>
            </div>
            <Modal isOpen={ isAuthModal } onClose={ onToggleModal }>
                Some text
            </Modal>
        </div>
    );
};
