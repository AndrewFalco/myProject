import {
    ChangeEvent, InputHTMLAttributes, memo, useCallback, useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'name'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string, required?: boolean) => void;
    readOnly?: boolean;
    errorText?: string;
    name?: string | null;
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
        required,
        errorText,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value, required);
    }, [onChange, required]);

    const hasError = useMemo(() => required && !value, [required, value]);

    const mods: Mods = {
        [cls.readonly]: readOnly,
        [cls.error]: hasError,
    };

    return (
        <div className={ classNames(cls.InputWrapper, {}, [className]) }>
            <input
              id={ id }
              name={ name || undefined }
              type={ type }
              className={ classNames(cls.Input, mods, [className]) }
              placeholder={ placeholder || name || undefined }
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
            {
                !!errorText && (
                    <label
                      htmlFor={ id }
                      className={ classNames(cls.errorText, {}, [className]) }
                    >
                        { errorText }
                    </label>
                )
            }
        </div>
    );
});
