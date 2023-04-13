import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui';
import { Currency } from '../Model/types/Currency';

type CurrencySelectProps = {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
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
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <ListBox
          items={ currencyOptions }
          value={ value }
          onChange={ onChangeHandler }
          defaultValue={ t('Select currency') }
          readonly={ readonly }
          className={ className }
          direction="top right"
          label={ t('Select currency') }
        />
    );
});
