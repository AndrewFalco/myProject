import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, Text, HStack } from 'shared/ui';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getReadonly } from '../../model/selectors/getReadonly/getReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slices/profileSlice';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';

export const EditableProfileCardHeader = memo(() => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const readonly = useSelector(getReadonly);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);

    const hasError = useMemo(() => !!error?.length, [error]);

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
        <HStack justify="between" max>
            <Text title={ t('Profile card') } />
            { isEqualUserProfile && (
            <HStack>
                {
                  readonly
                    ? (
                        !(hasError || isLoading) && (
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
                              disabled={ hasError }
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
