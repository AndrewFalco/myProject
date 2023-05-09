import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkTheme = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
    const { children, className, to, theme = 'primary', ...otherProps } = props;

    return (
        <Link
            to={ to }
            className={ classNames(cls.AppLink, {}, [className, cls[theme]]) }
            { ...otherProps }
        >
            { children }
        </Link>
    );
};
