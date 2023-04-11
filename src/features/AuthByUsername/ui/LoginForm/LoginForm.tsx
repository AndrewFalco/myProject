import {
    memo, ReactElement, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Button, VStack } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import { getLoginError } from '../../model/selectors/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

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
            <VStack gap="8" justify="center" grow className={ classNames(cls.LoginForm, {}, [className]) } max>
                <Text title={ t('Autorized form') } className={ cls.commonWrapper } />
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
                  className={ cls.commonWrapper }
                >
                    { t('Login') }
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
