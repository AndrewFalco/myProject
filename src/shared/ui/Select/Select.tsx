import {
 ChangeEvent, useCallback, useMemo,
} from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption <T extends string> {
    value: T;
    content: string;
}

interface SelectProps <T extends string>{
    className?: string,
    label?: string,
    options?: SelectOption<T>[],
    value?: T,
    onChange?: (value: T) => void,
    readOnly?: boolean,
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
        onChange?.(e.target.value as T);
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
};
