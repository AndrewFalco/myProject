import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Text } from '@/shared/ui/deprecated/Text';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { ProfileError } from '../model/types/profile';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from './ProfileCard';

import cls from './ProfileCard.module.scss';

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation('profile');

    return (
        <Text
            theme="error"
            title={ t('Error with loading') }
            text={ t('Please try to reload page or call to admin') }
            align="center"
        />
    );
};

export const ProfileCardDeprecatedLoader = () => (
    <VStack max
            maxHeight
            align="center"
            justify="center">
        <Loader />
    </VStack>
);

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readOnly = false,
        onChangeFirstName,
        onChangeLastName,
        onChangeAge,
        onChangeCountry,
        onChangeCity,
        onChangeEmail,
        onChangePhone,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeSex,
    } = props;
    const { t } = useTranslation('profile');

    const loadingError = useMemo((): ProfileError | undefined => error?.find((err) => err.key === 'loading'), [error]);

    const mods: Mods = {
        [cls.loading]: isLoading,
        [cls.error]: !!loadingError,
    };

    return (
        <div className={ classNames(cls.ProfileCard, mods, [className]) }>
            <VStack gap="4">
                <div className={ classNames(cls.avatarWrapper) }>
                    <Avatar src={ data?.avatar } sex={ data?.sex } />
                </div>
                <Input name={ t('Avatar') }
                       value={ data?.avatar || '' }
                       readOnly={ readOnly }
                       onChange={ onChangeAvatar } />
                <Input
                    name={ t('First name') }
                    value={ data?.firstName || '' }
                    readOnly={ readOnly }
                    onChange={ onChangeFirstName }
                    required
                    errorText={ error?.find((err) => err.key === 'firstName')?.text || undefined }
                    data-testid="ProfileCard.firstName"
                />
                <Input
                    name={ t('Last name') }
                    value={ data?.lastName || '' }
                    readOnly={ readOnly }
                    onChange={ onChangeLastName }
                    required
                    errorText={ error?.find((err) => err.key === 'lastName')?.text || undefined }
                    data-testid="ProfileCard.lastName"
                />
                <Input name={ t('User name') }
                       value={ data?.username }
                       readOnly={ readOnly }
                       onChange={ onChangeUsername } />
                <Input name={ t('Gender') }
                       value={ data?.sex }
                       readOnly={ readOnly }
                       onChange={ onChangeSex } />
                <Input name={ t('Age') }
                       value={ data?.age }
                       readOnly={ readOnly }
                       onChange={ onChangeAge }
                       type="number" />
                <CountrySelect value={ data?.country } onChange={ onChangeCountry } readonly={ readOnly } />
                <Input name={ t('City') }
                       value={ data?.city }
                       readOnly={ readOnly }
                       onChange={ onChangeCity } />
                <Input name={ t('Phone') }
                       value={ data?.phone }
                       readOnly={ readOnly }
                       onChange={ onChangePhone } />
                <Input name={ t('Email') }
                       value={ data?.email }
                       readOnly={ readOnly }
                       onChange={ onChangeEmail } />
                <CurrencySelect value={ data?.currency } onChange={ onChangeCurrency } readonly={ readOnly } />
            </VStack>
        </div>
    );
};
