import { HTMLAttributes, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

type CardVariant = 'normal' | 'outlined' | 'light';
type CardPadding = '0' | '8' | '16' | '24';
type CardBorder = 'rect' | 'round';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: CardVariant;
    padding?: CardPadding;
    border?: CardBorder;
    hovered?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = (props: PropsWithChildren<CardProps>) => {
    const { className, variant = 'normal', children, padding = '8', border = 'rect', hovered, ...otherProps } = props;
    const paddings = mapPaddingToClass[padding];

    return (
        <div
            className={ classNames(cls.Card, { [cls.hovered]: hovered }, [className, cls[variant], cls[paddings], cls[border]]) }
            { ...otherProps }
        >
            { children }
        </div>
    );
};
