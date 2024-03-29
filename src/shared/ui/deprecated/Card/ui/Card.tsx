import { HTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

type CardTheme = 'normal' | 'outlined';
interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    theme?: CardTheme;
}

/**
 * @deprecated
 */
export const Card = (props: PropsWithChildren<CardProps>) => {
    const { className, theme = 'normal', children, ...otherProps } = props;

    return (
        <div
            className={ classNames(cls.Card, {}, [className, cls[theme]]) }
            { ...otherProps }
        >
            { children }
        </div>
    );
};
