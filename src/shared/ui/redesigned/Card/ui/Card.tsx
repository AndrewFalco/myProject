import { HTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

type CardVariant = 'normal' | 'outlined';
type CardPadding = '0' | '8' | '16' | '24';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: CardVariant;
    padding?: CardPadding;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = (props: PropsWithChildren<CardProps>) => {
    const { className, variant = 'normal', children, padding ='8', ...otherProps } = props;
    const paddings = mapPaddingToClass[padding];

    return (
        <div
            className={ classNames(cls.Card, { }, [className, cls[variant], cls[paddings]]) }
            { ...otherProps }
        >
            { children }
        </div>
    );
};
