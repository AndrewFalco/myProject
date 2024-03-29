import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import {
    FlexJustify,
    FlexAlign,
    FlexPosition,
    FlexDirection,
    FlexGap,
    FlexWrap,
} from './Flex.types';
import { classes } from './styles/Flex.classes';
import cls from './styles/Flex.module.scss';

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    className?: string;
    justify?: FlexJustify;
    align?: FlexAlign;
    position?: FlexPosition;
    direction?: FlexDirection;
    gap?: FlexGap;
    wrap?: FlexWrap;
    max?: boolean;
    maxHeight?: boolean;
    grow?: boolean;
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
        maxHeight,
        grow,
        wrap,
        ...other
    } = props;

    const mods: Mods = {
        [cls.max]: max,
        [cls.maxHeight]: maxHeight,
        [cls.grow]: grow,
    };

    const currentClasses = classes({
        align,
        position,
        direction,
        justify,
        gap,
        wrap,
    });

    return (
        <div
            className={ classNames(cls.Flex, mods, [
                className,
                ...currentClasses,
            ]) }
            { ...other }
        >
            { children }
        </div>
    );
};
