import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'error';
export type TextAlign = 'center' | 'right' | 'left';
export type TextSize = 'size_s' | 'size_m' | 'size_l';
export type HeaderTagType = 'h1' | 'h2' | 'h3';

interface TextProps {
    className?: string;
    title?: string | null,
    text?: string | null,
    theme?: TextTheme,
    align?: TextAlign,
    size?: TextSize,
    'data-testid'?: string,

}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    size_l: 'h1',
    size_m: 'h2',
    size_s: 'h3',
};

export const Text = memo((props: TextProps) => {
    const {
        className, theme = 'primary', title, text, align = 'left', size = 'size_m', 'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    const mods: Mods = {
        [cls.right]: align === 'right',
        [cls.left]: align === 'left',
        [cls.center]: align === 'center',
        [cls.sizeS]: size === 'size_s',
        [cls.sizeM]: size === 'size_m',
        [cls.sizeL]: size === 'size_l',
    };

    return (
        <div className={ classNames(cls.Text, mods, [className, cls[theme]]) }>
            { title && (
                <HeaderTag
                  className={ cls.title }
                  data-testid={ `${dataTestId}.Header` }
                >
                    { title }
                </HeaderTag>
            ) }
            { text && (
                <p
                  className={ cls.text }
                  data-testid={ `${dataTestId}.Paragraph` }
                >
                    { text }
                </p>
            ) }
        </div>
    );
});
