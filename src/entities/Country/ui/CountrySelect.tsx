import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../Model/types/Country';

type CountrySelectProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

type CountryOptionType = {
    value: Country,
    content: Country
}

const CountryOptions: CountryOptionType[] = [
    { value: 'Russian Federation', content: 'Russian Federation' },
    { value: 'Belarus', content: 'Belarus' },
    { value: 'Australia', content: 'Australia' },
    { value: 'Germany', content: 'Germany' },
    { value: 'Kazakhstan', content: 'Kazakhstan' },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className, onChange, readonly, value,
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value);
    }, [onChange]);

    return (
        <Select
          className={ classNames('', {}, [className]) }
          label={ t('Select country') }
          options={ CountryOptions }
          value={ value }
          onChange={ onChangeHandler }
          readOnly={ readonly }
        />
    );
});
