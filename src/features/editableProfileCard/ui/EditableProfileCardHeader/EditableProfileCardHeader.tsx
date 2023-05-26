import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button as ButtonDeprecated, Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getReadonly } from '../../model/selectors/getReadonly/getReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slices/profileSlice';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { ToggleFeature } from '@/shared/lib/features';

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
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <HStack justify="between" max>
                    <Text title={ t('Profile card') } />
                    { isEqualUserProfile && (
                        <HStack>
                            { readonly ? (
                                !(hasError || isLoading) && (
                                    <Button
                                        variant="outline"
                                        onClick={ onEditMode }
                                        colorButton="normal"
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        { t('Edit') }
                                    </Button>
                                )
                            ) : (
                                <HStack gap="16">
                                    <Button
                                        variant="outline"
                                        onClick={ onSave }
                                        disabled={ hasError }
                                        colorButton="success"
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                    >
                                        { t('Save') }
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={ onCancel }
                                        colorButton="error"
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                    >
                                        { t('Cancel') }
                                    </Button>
                                </HStack>
                            ) }
                        </HStack>
                    ) }
                </HStack>
            }
            off={
                <HStack justify="between" max>
                    <TextDeprecated title={ t('Profile card') } />
                    { isEqualUserProfile && (
                        <HStack>
                            { readonly ? (
                                !(hasError || isLoading) && (
                                    <ButtonDeprecated
                                        theme="outline"
                                        onClick={ onEditMode }
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        { t('Edit') }
                                    </ButtonDeprecated>
                                )
                            ) : (
                                <HStack gap="16">
                                    <ButtonDeprecated
                                        theme="outline"
                                        colorType="success"
                                        onClick={ onSave }
                                        disabled={ hasError }
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                    >
                                        { t('Save') }
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        theme="outline"
                                        colorType="error"
                                        onClick={ onCancel }
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                    >
                                        { t('Cancel') }
                                    </ButtonDeprecated>
                                </HStack>
                            ) }
                        </HStack>
                    ) }
                </HStack>
            }
        />
    );
});
