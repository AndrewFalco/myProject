import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import {
    Loader, Text, Avatar, Input, VStack,
} from '@/shared/ui';
import { ProfileError, ProfileType } from '../model/types/profile';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string,
    data?: ProfileType,
    isLoading?: boolean,
    error?: ProfileError[],
    readOnly?: boolean,
    onChangeFirstName?: (value?: string) => void,
    onChangeLastName?: (value?: string) => void,
    onChangeAge?: (value?: string) => void,
    onChangeCountry?: (value?: Country) => void,
    onChangeCity?: (value?: string) => void,
    onChangeEmail?: (value?: string) => void,
    onChangePhone?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeAvatar?: (value?: string) => void,
    onChangeCurrency?: (value?: Currency) => void,
    onChangeSex?: (value?: string) => void,
}

export const ProfileCard = (props: ProfileCardProps) => {
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
            {
              isLoading
                ? <Loader />
                : (
                  loadingError
                    ? (
                        <Text
                          theme="error"
                          title={ t('Error with loading') }
                          text={ t(loadingError.text || 'Please try to reload page or call to admin') }
                          align="center"
                        />
                      )
                    : (
                        <VStack gap="4">
                            <div className={ classNames(cls.avatarWrapper) }>
                                <Avatar src={ data?.avatar } sex={ data?.sex } />
                            </div>
                            <Input
                              name={ t('Avatar') }
                              value={ data?.avatar || '' }
                              readOnly={ readOnly }
                              onChange={ onChangeAvatar }
                            />
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
                            <Input
                              name={ t('User name') }
                              value={ data?.username }
                              readOnly={ readOnly }
                              onChange={ onChangeUsername }
                            />
                            <Input
                              name={ t('Sex') }
                              value={ data?.sex }
                              readOnly={ readOnly }
                              onChange={ onChangeSex }
                            />
                            <Input
                              name={ t('Age') }
                              value={ data?.age }
                              readOnly={ readOnly }
                              onChange={ onChangeAge }
                              type="number"
                            />
                            <CountrySelect
                              value={ data?.country }
                              onChange={ onChangeCountry }
                              readonly={ readOnly }
                            />
                            <Input
                              name={ t('City') }
                              value={ data?.city }
                              readOnly={ readOnly }
                              onChange={ onChangeCity }
                            />
                            <Input
                              name={ t('Phone') }
                              value={ data?.phone }
                              readOnly={ readOnly }
                              onChange={ onChangePhone }
                            />
                            <Input
                              name={ t('Email') }
                              value={ data?.email }
                              readOnly={ readOnly }
                              onChange={ onChangeEmail }
                            />
                            <CurrencySelect
                              value={ data?.currency }
                              onChange={ onChangeCurrency }
                              readonly={ readOnly }
                            />
                        </VStack>
                      )
                )
            }
        </div>
    );
};
