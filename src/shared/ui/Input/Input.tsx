import {
    ChangeEvent, FC, InputHTMLAttributes, memo, useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const InputComponent: FC<InputProps> = (props) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        name,
        id,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <div className={ classNames(cls.InputWrapper, {}, [className]) }>
            <input
                id={ id }
                name={ name }
                type={ type }
                className={ classNames(cls.Input, {}, [className]) }
                placeholder={ placeholder || name }
                value={ value }
                onChange={ onChangeHandler }
                { ...otherProps }
            />
            <label
                htmlFor={ id }
                className={ classNames(cls.Label, {}, [className]) }
            >
                { placeholder || name }
            </label>
        </div>
    );
};

export const Input = memo(InputComponent);
