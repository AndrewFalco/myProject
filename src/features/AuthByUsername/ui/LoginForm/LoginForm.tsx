import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';

import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string,
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={ classNames(cls.LoginForm, {}, [className]) }>
            <Input id="auth_username" name={ t('User name') } required autoFocus />
            <Input id="auth_password" name={ t('Password') } type="password" required />
            <Button theme="outline">{ t('Login') }</Button>
        </div>
    );
};
