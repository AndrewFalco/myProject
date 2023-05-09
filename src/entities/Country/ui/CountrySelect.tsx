import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui';
import { DropdownDirection } from '@/shared/types/ui';
import { Country } from '../Model/types/Country';

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

    return (
        <ListBox
            items={ countryOptions }
            value={ value }
            onChange={ onChangeHandler }
            defaultValue={ t('Select country') || undefined }
            readonly={ readonly }
            className={ classNames('', {}, [className]) }
            direction={ direction }
            label={ t('Select country') || undefined }
        />
    );
});
