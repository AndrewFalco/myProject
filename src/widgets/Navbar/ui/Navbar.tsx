import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string,
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.Navbar, {}, [className]) }>
            <div className={ classNames(cls.links, {}, []) }>
                <AppLink to="/" className={ classNames(cls.mainLink) }>{ t('Main page') }</AppLink>
                <AppLink to="/about">{ t('About page') }</AppLink>
            </div>
        </div>
    );
};
