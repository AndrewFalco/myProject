import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'error';
export type TextAlign = 'center' | 'right' | 'left';
export type TextSize = 'size_m' | 'size_l';

interface TextProps {
    className?: string;
    title?: string,
    text?: string,
    theme?: TextTheme,
    align?: TextAlign,
    size?: TextSize,
}

export const Text = memo((props: TextProps) => {
    const {
        className, theme = 'primary', title, text, align = 'left', size = 'size_m',
    } = props;

    const mods: Mods = {
        [cls.right]: align === 'right',
        [cls.left]: align === 'left',
        [cls.center]: align === 'center',
        [cls.sizeM]: size === 'size_m',
        [cls.sizeL]: size === 'size_l',
    };

    return (
        <div className={ classNames(cls.Text, mods, [className, cls[theme]]) }>
            { title && <p className={ cls.title }>{ title }</p> }
            { text && <p className={ cls.text }>{ text }</p> }
        </div>
    );
});
