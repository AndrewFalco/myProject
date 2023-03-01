import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { memo, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string,
}

export const LoginForm = memo((props: LoginFormProps): ReactElement => {
    const { className } = props;
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
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
    );
});
