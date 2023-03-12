import { getReadonly } from 'pages/ProfilePage/model/selectors/getReadonly/getReadonly';
import { updateProfileData } from 'pages/ProfilePage/model/services/updateProfileData/updateProfileData';
import { profileActions } from 'pages/ProfilePage/model/slice/profileSlice';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, Text } from 'shared/ui';

import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string,
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();
    const readonly = useSelector(getReadonly);

    const onEditMode = useCallback(() => {
        dispatch(profileActions.setReadonly(!readonly));
    }, [dispatch, readonly]);

    const onCancel = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <div className={ classNames(cls.ProfilePageHeader, {}, [className]) }>
            <Text title={ t('Profile card') } />
            <div className={ cls.btnGroup }>
                {
                readonly
                    ? (
                        <Button theme="outline" className={ cls.editBtn } onClick={ onEditMode }>
                            { t('Edit') }
                        </Button>
                    )
                    : (
                        <>
                            <Button theme="outline" colorType="success" className={ cls.editBtn } onClick={ onSave }>
                                { t('Save') }
                            </Button>
                            <Button theme="outline" colorType="error" className={ cls.editBtn } onClick={ onCancel }>
                                { t('Cancel') }
                            </Button>
                        </>
                    )
            }
            </div>
        </div>
    );
});
