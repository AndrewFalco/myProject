import { getUserAuthData } from 'entities/User';
import { getProfileData } from 'pages/ProfilePage/model/selectors/getProfileData/getProfileData';
import { getReadonly } from 'pages/ProfilePage/model/selectors/getReadonly/getReadonly';
import { updateProfileData } from 'pages/ProfilePage/model/services/updateProfileData/updateProfileData';
import { profileActions } from 'pages/ProfilePage/model/slice/profileSlice';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, Text } from 'shared/ui';

import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string,
    hasFormError?: boolean,
    isLoading?: boolean,
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
    const { className, hasFormError, isLoading } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const readonly = useSelector(getReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const onEditMode = useCallback(() => {
        dispatch(profileActions.setReadonly(!readonly));
    }, [dispatch, readonly]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    const isEqualUserProfile = useMemo(() => profileData?.id === authData?.id, [authData?.id, profileData?.id]);

    return (
        <div className={ classNames(cls.ProfilePageHeader, {}, [className]) }>
            <Text title={ t('Profile card') } />
            { isEqualUserProfile && (
            <div className={ cls.btnGroup }>
                {
                  readonly
                    ? (
                        !(hasFormError || isLoading) && (
                            <Button
                              theme="outline"
                              className={ cls.editBtn }
                              onClick={ onEditMode }
                            >
                                { t('Edit') }
                            </Button>
                        )
                    )
                    : (
                        <>
                            <Button
                              theme="outline"
                              colorType="success"
                              className={ cls.editBtn }
                              onClick={ onSave }
                              disabled={ hasFormError }
                            >
                                { t('Save') }
                            </Button>
                            <Button
                              theme="outline"
                              colorType="error"
                              className={ cls.editBtn }
                              onClick={ onCancel }
                            >
                                { t('Cancel') }
                            </Button>
                        </>
                    )
                }
            </div>
            ) }
        </div>
    );
});
