import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../Stack';
import { Text } from '../../Text';
import cls from './Input.module.scss';

type HTMLTextAreaProps = Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'readOnly'>;

interface TextareaProps extends HTMLTextAreaProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    label?: string;
    cols?: number;
    rows?: number;
}

export const Textarea = memo((props: TextareaProps) => {
    const { className, value, onChange, placeholder, autofocus, readonly, label, cols = 30, rows = 5, ...otherProps } = props;
    const ref = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
    };

    const input = (
        <div className={ classNames(cls.TextareaWrapper, mods, [className]) }>
            <textarea
                ref={ ref }
                value={ value }
                onChange={ onChangeHandler }
                className={ cls.input }
                onFocus={ onFocus }
                onBlur={ onBlur }
                readOnly={ readonly }
                placeholder={ placeholder }
                cols={ cols }
                rows={ rows }
                { ...otherProps }
            />
        </div>
    );

    return label ? (
        <HStack gap="8"
                max
                justify="between">
            <Text text={ label } className={ cls.label } />
            { input }
        </HStack>
    ) : (
        input
    );
});
