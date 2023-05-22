import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';
export type TextAlign = 'center' | 'right' | 'left';
export type TextSize = 'sizeS' | 'sizeM' | 'sizeL';
export type HeaderTagType = 'h1' | 'h2' | 'h3';

interface TextProps {
    className?: string;
    title?: string | null;
    text?: string | null;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    'data-testid'?: string;
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    sizeL: 'h1',
    sizeM: 'h2',
    sizeS: 'h3',
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        variant = 'primary',
        title,
        text,
        align = 'left',
        size = 'sizeM',
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div
            className={ classNames(cls.Text, {}, [
                className,
                cls[variant],
                cls[align],
                cls[size],
            ]) }
        >
            { title && (
                <HeaderTag
                    className={ cls.title }
                    data-testid={ `${dataTestId}.Header` }
                >
                    { title }
                </HeaderTag>
            ) }
            { text && (
                <p className={ cls.text } data-testid={ `${dataTestId}.Paragraph` }>
                    { text }
                </p>
            ) }
        </div>
    );
});
