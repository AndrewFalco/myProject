import {
 ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string,
    label?: string,
    options?: SelectOption[],
    value?: string,
    onChange?: (value: string) => void,
    readOnly?: boolean,
}

export const Select = memo((props: SelectProps) => {
    const {
        className, label, options, value, onChange, readOnly,
    } = props;

    const mods: Mods = {
        [cls.readonly]: readOnly,
    };

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
          className={ classNames(cls.option) }
          value={ opt.value }
          key={ opt.value }
        >
            { opt.content }
        </option>
    )), [options]);

    const onChangeValue = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    }, [onChange]);

    return (
        <div className={ classNames(cls.Wrapper, {}, [className]) }>
            { label && (
                <span className={ classNames(cls.label, mods) }>
                    { label }
                </span>
            ) }
            <select
              className={ classNames(cls.select) }
              value={ value }
              onChange={ onChangeValue }
              disabled={ readOnly }
            >
                { optionsList }
            </select>
        </div>
    );
});
