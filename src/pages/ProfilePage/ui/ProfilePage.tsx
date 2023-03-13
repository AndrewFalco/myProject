import { ProfileCard } from 'entities/Profile';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getProfileError } from '../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getReadonly } from '../model/selectors/getReadonly/getReadonly';
import { fetchProfileData } from '../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../model/slice/profileSlice';

import cls from './ProfilePage.module.scss';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string,
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readOnly = useSelector(getReadonly);

    useEffect(() => {
        dispatch(fetchProfileData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hasError = useMemo(() => !!error?.length, [error]);

    const onChangeFirstName = useCallback((value?: string, required?: boolean) => {
        dispatch(profileActions.updateProfile({ firstName: value || '' }));
        if (required) {
            if (!value) {
                dispatch(profileActions.setError({ key: 'firstName', text: 'Can not be empty' }));
            } else {
                dispatch(profileActions.removeError({ key: 'firstName' }));
            }
        }
    }, [dispatch]);

    const onChangeLastName = useCallback((value?: string, required?: boolean) => {
        dispatch(profileActions.updateProfile({ lastName: value || '' }));
        if (required) {
            if (!value) {
                dispatch(profileActions.setError({ key: 'lastName', text: 'Can not be empty' }));
            } else {
                dispatch(profileActions.removeError({ key: 'lastName' }));
            }
        }
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }, [dispatch]);

    const onChangeCountry = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ country: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ city: value || '' }));
    }, [dispatch]);

    const onChangeEmail = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ email: value || '' }));
    }, [dispatch]);

    const onChangePhone = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ phone: value || '' }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ currency: value || '' }));
    }, [dispatch]);

    const onChangeSex = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ sex: value || '' }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <div className={ classNames(cls.ProfilePage, {}, [className]) }>
                <ProfilePageHeader hasFormError={ hasError } />
                <ProfileCard
                  data={ formData }
                  isLoading={ isLoading }
                  error={ error }
                  readOnly={ readOnly }
                  onChangeFirstName={ onChangeFirstName }
                  onChangeLastName={ onChangeLastName }
                  onChangeAge={ onChangeAge }
                  onChangeCountry={ onChangeCountry }
                  onChangeCity={ onChangeCity }
                  onChangeEmail={ onChangeEmail }
                  onChangePhone={ onChangePhone }
                  onChangeUsername={ onChangeUsername }
                  onChangeAvatar={ onChangeAvatar }
                  onChangeCurrency={ onChangeCurrency }
                  onChangeSex={ onChangeSex }
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
