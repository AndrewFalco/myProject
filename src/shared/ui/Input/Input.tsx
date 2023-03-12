import {
    ChangeEvent, InputHTMLAttributes, memo, useCallback,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        name,
        id,
        readOnly,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    const mods: Mods = {
        [cls.readonly]: readOnly,
    };

    return (
        <div className={ classNames(cls.InputWrapper, {}, [className]) }>
            <input
              id={ id }
              name={ name }
              type={ type }
              className={ classNames(cls.Input, mods, [className]) }
              placeholder={ placeholder || name }
              value={ value }
              onChange={ onChangeHandler }
              readOnly={ readOnly }
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
});
