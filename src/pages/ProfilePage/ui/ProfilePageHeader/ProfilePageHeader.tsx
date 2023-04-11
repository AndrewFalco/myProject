import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, Text, HStack } from 'shared/ui';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getReadonly } from '../../model/selectors/getReadonly/getReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface ProfilePageHeaderProps {
    hasFormError?: boolean,
    isLoading?: boolean,
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
    const { hasFormError, isLoading } = props;
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
        <HStack justify="between">
            <Text title={ t('Profile card') } />
            { isEqualUserProfile && (
            <HStack>
                {
                  readonly
                    ? (
                        !(hasFormError || isLoading) && (
                            <Button
                              theme="outline"
                              onClick={ onEditMode }
                            >
                                { t('Edit') }
                            </Button>
                        )
                    )
                    : (
                        <HStack gap="16">
                            <Button
                              theme="outline"
                              colorType="success"
                              onClick={ onSave }
                              disabled={ hasFormError }
                            >
                                { t('Save') }
                            </Button>
                            <Button
                              theme="outline"
                              colorType="error"
                              onClick={ onCancel }
                            >
                                { t('Cancel') }
                            </Button>
                        </HStack>
                    )
                }
            </HStack>
            ) }
        </HStack>
    );
});
