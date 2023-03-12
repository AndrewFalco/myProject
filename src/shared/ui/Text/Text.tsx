import { FC } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'error';
export type TextAlign = 'center' | 'right' | 'left';

interface TextProps {
    title?: string,
    text?: string,
    theme?: TextTheme,
    align?: TextAlign,
}

export const Text: FC<TextProps> = (props) => {
    const {
        theme = 'primary', title, text, align = 'left',
    } = props;

    const mods: Mods = {
        [cls.right]: align === 'right',
        [cls.left]: align === 'left',
        [cls.center]: align === 'center',
    };

    return (
        <div className={ classNames(cls.Text, mods, [cls[theme]]) }>
            { title && <p className={ cls.title }>{ title }</p> }
            { text && <p className={ cls.text }>{ text }</p> }
        </div>
    );
};
