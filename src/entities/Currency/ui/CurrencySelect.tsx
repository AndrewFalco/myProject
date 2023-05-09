import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui';
import { DropdownDirection } from '@/shared/types/ui';
import { Currency } from '../Model/types/Currency';

type CurrencySelectProps = {
    className?: string;
    value?: string;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
};

type CurrencyOptionType = {
    value: Currency;
    content: Currency;
};

const currencyOptions: CurrencyOptionType[] = [
    { value: 'RUB', content: 'RUB' },
    { value: 'CNY', content: 'CNY' },
    { value: 'EUR', content: 'EUR' },
    { value: 'USD', content: 'USD' },
    { value: 'GBP', content: 'GBP' },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        onChange,
        readonly,
        value,
        direction = 'top right',
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <ListBox
            items={ currencyOptions }
            value={ value }
            onChange={ onChangeHandler }
            defaultValue={ t('Select currency') || undefined }
            readonly={ readonly }
            className={ className }
            direction={ direction }
            label={ t('Select currency') || undefined }
        />
    );
});
