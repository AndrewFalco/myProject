import { FlexProps } from '../Flex';
import {
    FlexAlign, FlexDirection, FlexGap, FlexJustify, FlexPosition, FlexWrap,
} from '../Flex.types';

import cls from './Flex.module.scss';

export const alignClasses: Record<FlexAlign, string> = {
    center: cls.alignCenter,
    end: cls.alignEnd,
    start: cls.alignStart,
};

export const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
};

export const positionClasses: Record<FlexPosition, string> = {
    relative: cls.positionRelative,
    absolute: cls.positionAbsolute,
    fixed: cls.positionFixed,
};

export const justifyClasses: Record<FlexJustify, string> = {
    around: cls.justifyAround,
    between: cls.justifyBetween,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    start: cls.justifyStart,
};

export const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
    64: cls.gap64,
};

export const wrapClasses: Record<FlexWrap, string> = {
    wrap: cls.flexWrap,
    nowrap: cls.flexNoWrap,
    reverse: cls.flexWrapReverse,
};

export const classes = (props: Omit<FlexProps, 'className'>) => {
    const {
        align, direction, justify, position, gap, wrap,
    } = props;

    return [
        align && alignClasses[align],
        direction && directionClasses[direction],
        justify && justifyClasses[justify],
        position && positionClasses[position],
        gap && gapClasses[gap],
        wrap && wrapClasses[wrap],
    ];
};
