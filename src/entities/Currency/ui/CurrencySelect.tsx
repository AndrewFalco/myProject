import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Currency } from 'shared/consts/common';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

type CurrencySelectProps = {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

type CurrencyOptionType = {
    value: Currency,
    content: Currency
}

const currencyOptions: CurrencyOptionType[] = [
    { value: 'RUB', content: 'RUB' },
    { value: 'CNY', content: 'CNY' },
    { value: 'EUR', content: 'EUR' },
    { value: 'USD', content: 'USD' },
    { value: 'GBP', content: 'GBP' },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
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
          label={ t('Select currency') }
          options={ currencyOptions }
          value={ value }
          onChange={ onChangeHandler }
          readOnly={ readonly }
        />
    );
});
