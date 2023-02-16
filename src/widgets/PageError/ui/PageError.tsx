import { FC, useCallback } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';

import cls from './PageError.module.scss';

interface PageErrorProps extends FallbackProps {
    className?: string,
}

export const PageError: FC<PageErrorProps> = (props) => {
    const { className, resetErrorBoundary, error } = props;
    const { t } = useTranslation();

    const tryAgain = useCallback(() => {
        resetErrorBoundary();
    }, []);

    return (
        <div className={ classNames(cls.PageError, {}, [className]) }>
            <div>{ t('Something went wrong') }</div>
            <div>{ `${t('Error message')}: ${error.message}` }</div>
            <Button onClick={ tryAgain }>
                { t('Try again') }
            </Button>
        </div>
    );
};
