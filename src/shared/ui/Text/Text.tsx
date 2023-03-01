import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextTheme = 'primary' | 'error';

interface TextProps {
    className?: string,
    title?: string,
    text?: string,
    theme?: TextTheme,
}

export const Text: FC<TextProps> = (props) => {
    const {
        className, theme = 'primary', title, text,
    } = props;

    return (
        <div className={ classNames(cls.Text, {}, [cls[theme]]) }>
            { title && <p className={ cls.title }>{ title }</p> }
            { text && <p className={ cls.text }>{ text }</p> }
        </div>
    );
};
