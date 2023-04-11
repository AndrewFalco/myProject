import { PropsWithChildren } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import {
    FlexJustify, FlexAlign, FlexPosition, FlexDirection, FlexGap, FlexWrap,
} from './Flex.types';
import { classes } from './styles/Flex.classes';
import cls from './styles/Flex.module.scss';

export interface FlexProps {
    className?: string,
    justify?: FlexJustify,
    align?: FlexAlign,
    position?: FlexPosition,
    direction?: FlexDirection,
    gap?: FlexGap,
    wrap?: FlexWrap,
    max?: boolean,
    grow?: boolean,
}

export const Flex = (props: PropsWithChildren<FlexProps>) => {
    const {
        className,
        children,
        direction = 'row',
        justify = 'start',
        position = 'relative',
        align = 'center',
        gap,
        max,
        grow,
        wrap,
    } = props;

    const mods: Mods = {
        [cls.max]: max,
        [cls.grow]: grow,
    };

    const currentClasses = classes({
        align, position, direction, justify, gap, wrap,
    });

    return (
        <div className={ classNames(cls.Flex, mods, [className, ...currentClasses]) }>
            { children }
        </div>
    );
};
