import { ButtonHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type VariantButton = 'clear' | 'outline' | 'filled';
export type ButtonSize = 'sizeM' | 'sizeL' | 'sizeXL';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: VariantButton;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        className,
        variant = 'outline',
        square,
        size = 'sizeM',
        disabled,
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
                cls[variant],
                cls[size],
            ]) }
            { ...other }
        >
            { children }
        </button>
    );
});
