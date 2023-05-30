import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type VariantButton = 'clear' | 'outline' | 'filled';
export type ColorButton = 'normal' | 'success' | 'error';
export type ButtonSize = 'sizeM' | 'sizeL' | 'sizeXL';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: VariantButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    colorButton?: ColorButton;
}

export const Button = forwardRef((props: ButtonProps, ref) => {
    const {
        children,
        className,
        variant = 'outline',
        square,
        size = 'sizeM',
        disabled,
        fullWidth,
        addonLeft,
        addonRight,
        colorButton = 'none',
        ...other
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <button
            type="button"
            disabled={ disabled }
            className={ classNames(cls.Button, mods, [className, cls[variant], cls[size], cls[colorButton]]) }
            { ...other }
        >
            <div className={ cls.addonLeft }>{ addonLeft }</div>
            { children }
            <div className={ cls.addonRight }>{ addonRight }</div>
        </button>
    );
});
