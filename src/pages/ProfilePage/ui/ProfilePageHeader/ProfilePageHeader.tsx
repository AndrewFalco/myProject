import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, Text } from 'shared/ui';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getReadonly } from '../../model/selectors/getReadonly/getReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

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
