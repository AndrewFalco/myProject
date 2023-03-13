import { CountrySelect } from 'entities/Country';
import { CurrencySelect } from 'entities/Currency';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Loader, Text, Avatar } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
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
    onChangeCountry?: (value?: string) => void,
    onChangeCity?: (value?: string) => void,
    onChangeEmail?: (value?: string) => void,
    onChangePhone?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeAvatar?: (value?: string) => void,
    onChangeCurrency?: (value?: string) => void,
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
                        <div>
                            <div className={ classNames(cls.avatarWrapper) }>
                                <Avatar src={ data?.avatar } sex={ data?.sex } />
                            </div>
                            <Input
                              name={ t('Avatar') }
                              value={ data?.avatar || '' }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeAvatar }
                            />
                            <Input
                              name={ t('First name') }
                              value={ data?.firstName || '' }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeFirstName }
                              required
                              errorText={ error?.find((err) => err.key === 'firstName')?.text || undefined }
                            />
                            <Input
                              name={ t('Last name') }
                              value={ data?.lastName || '' }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeLastName }
                              required
                              errorText={ error?.find((err) => err.key === 'lastName')?.text || undefined }
                            />
                            <Input
                              name={ t('User name') }
                              value={ data?.username }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeUsername }
                            />
                            <Input
                              name={ t('Sex') }
                              value={ data?.sex }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeSex }
                            />
                            <Input
                              name={ t('Age') }
                              value={ data?.age }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeAge }
                              type="number"
                            />
                            <CountrySelect
                              value={ data?.country }
                              className={ cls.input }
                              readonly={ readOnly }
                              onChange={ onChangeCountry }
                            />
                            <Input
                              name={ t('City') }
                              value={ data?.city }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeCity }
                            />
                            <Input
                              name={ t('Phone') }
                              value={ data?.phone }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangePhone }
                            />
                            <Input
                              name={ t('Email') }
                              value={ data?.email }
                              className={ cls.input }
                              readOnly={ readOnly }
                              onChange={ onChangeEmail }
                            />
                            <CurrencySelect
                              value={ data?.currency }
                              onChange={ onChangeCurrency }
                              readonly={ readOnly }
                              className={ cls.input }
                            />
                        </div>
                      )
                )
            }
        </div>
    );
};
