import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { DropdownDirection } from '@/shared/types/ui';
import { Currency } from '../Model/types/Currency';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeature } from '@/shared/lib/features';

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

    const currencyProps = {
        items: currencyOptions,
        value,
        onChange: onChangeHandler,
        defaultValue: t('Select currency') || undefined,
        readonly,
        className,
        direction,
        label: t('Select currency') || undefined,
    };

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <ListBox { ...currencyProps } /> }
            off={ <ListBoxDeprecated { ...currencyProps } /> }
        />
    );
});
