import { useCallback } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated';

import cls from './PageError.module.scss';

interface PageErrorProps extends FallbackProps {
    className?: string;
}

export const PageError = (props: PageErrorProps) => {
    const { className, resetErrorBoundary, error } = props;
    const { t } = useTranslation();

    const tryAgain = useCallback(() => {
        resetErrorBoundary();
    }, [resetErrorBoundary]);

    return (
        <div className={ classNames(cls.PageError, {}, [className]) }>
            <div>{ t('Something went wrong') }</div>
            <div>{ `${t('Error message')}: ${error.message}` }</div>
            <Button onClick={ tryAgain }>{ t('Try again') }</Button>
        </div>
    );
};
