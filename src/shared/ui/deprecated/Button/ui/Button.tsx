import { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ThemeButton =
    | 'clear'
    | 'outline'
    | 'background'
    | 'backgroundInverted';

export type ButtonSize = 'sizeM' | 'sizeL' | 'sizeXL';
export type ButtonType = 'success' | 'error' | 'neutral' | 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    colorType?: ButtonType;
}

/**
 * @deprecated
 */
export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        theme = 'outline',
        square,
        size = 'sizeM',
        disabled,
        colorType = 'primary',
        ...other
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            disabled={ disabled }
            className={ classNames(cls.Button, mods, [
                className,
                cls[theme],
                cls[size],
                cls[colorType],
            ]) }
            { ...other }
        >
            { children }
        </button>
    );
});
