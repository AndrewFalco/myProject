import {
    ChangeEvent,
    InputHTMLAttributes,
    memo,
    useCallback,
    useMemo,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface TextareaProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string, required?: boolean) => void;
    readOnly?: boolean;
    errorText?: string;
    cols?: number;
    rows?: number;
}

/**
 * @deprecated
 */
export const Textarea = memo((props: TextareaProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        name,
        id,
        readOnly,
        required,
        errorText,
        cols = 30,
        rows = 5,
        ...otherProps
    } = props;

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            onChange?.(e.target.value, required);
        },
        [onChange, required],
    );

    const hasError = useMemo(() => required && !value, [required, value]);

    const mods: Mods = {
        [cls.readonly]: readOnly,
        [cls.error]: hasError,
    };

    return (
        <div className={ classNames(cls.InputAreaWrapper, {}, [className]) }>
            <textarea
                id={ id }
                name={ name }
                className={ classNames(cls.Input, mods, [className]) }
                placeholder={ placeholder || name }
                value={ value }
                onChange={ onChangeHandler }
                cols={ cols }
                rows={ rows }
                readOnly={ readOnly }
                { ...otherProps }
            />
            <label
                htmlFor={ id }
                className={ classNames(cls.Label, {}, [className]) }
            >
                { placeholder || name }
            </label>
            { !!errorText && (
                <label
                    htmlFor={ id }
                    className={ classNames(cls.errorText, {}, [className]) }
                >
                    { errorText }
                </label>
            ) }
        </div>
    );
});
