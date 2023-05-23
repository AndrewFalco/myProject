import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { DropdownDirection } from '@/shared/types/ui';
import { Country } from '../Model/types/Country';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { ToggleFeature } from '@/shared/lib/features';

type CountrySelectProps = {
    className?: string;
    value?: string;
    onChange?: (value: Country) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
};

type CountryOptionType = {
    value: Country;
    content: Country;
};

const countryOptions: CountryOptionType[] = [
    { value: 'Russian Federation', content: 'Russian Federation' },
    { value: 'Belarus', content: 'Belarus' },
    { value: 'Australia', content: 'Australia' },
    { value: 'Germany', content: 'Germany' },
    { value: 'Kazakhstan', content: 'Kazakhstan' },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
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
            onChange?.(value as Country);
        },
        [onChange],
    );

    const countryProps = {
        items: countryOptions,
        value,
        onChange: onChangeHandler,
        defaultValue: t('Select country') || undefined,
        readonly,
        className: classNames('', {}, [className]),
        direction,
        label: t('Select country') || undefined,
    };

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <ListBox { ...countryProps } /> }
            off={ <ListBoxDeprecated { ...countryProps } /> }
        />
    );
});
