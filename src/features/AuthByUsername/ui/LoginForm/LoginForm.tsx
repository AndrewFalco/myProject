import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError';
import { getLoginLoading } from 'features/AuthByUsername/model/selectors/getLoginLoading';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUsername/model/selectors/getLoginUsername';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import {
    memo, ReactElement, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';

import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string,
    onSuccess?: () => void,
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps): ReactElement => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginLoading);
    const error = useSelector(getLoginError);

    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled' && onSuccess) {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, username]);

    return (
        <DynamicModuleLoader reducers={ initialReducers }>
            <div className={ classNames(cls.LoginForm, {}, [className]) }>
                <Text title={ t('Autorized form') } />
                { error && <Text theme="error" text={ t(error) } /> }
                <Input
                    id="auth_username"
                    name={ t('User name') }
                    onChange={ onChangeUsername }
                    value={ username }
                    required
                />
                <Input
                    id="auth_password"
                    name={ t('Password') }
                    onChange={ onChangePassword }
                    value={ password }
                    type="password"
                    required
                />
                <Button
                    theme="outline"
                    onClick={ onLoginClick }
                    disabled={ isLoading }
                >
                    { t('Login') }
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
