import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, Text } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
import { getProfileData } from '../model/selectors/getProfileData/getProfoleData';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../model/selectors/getProfoleIsLoading/getProfileIsLoading';

import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string,
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    return (
        <div className={ classNames(cls.ProfileCard, {}, [className]) }>
            <div className={ cls.header }>
                <Text title={ t('Profile card') } />
                <Button theme="outline" className={ cls.editBtn }>
                    { t('Edit') }
                </Button>
            </div>
            <div className={ cls.content }>
                <Input name={ t('First name') } value={ data?.firstName } className={ cls.input } />
                <Input name={ t('Last name') } value={ data?.lastName } className={ cls.input } />
            </div>
        </div>
    );
};
