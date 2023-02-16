import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { ThemeButton } from 'shared/ui/Button/ui/Button';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
    className?: string,
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
    const { className } = props;
    const { t, i18n } = useTranslation();

    const toggleLang = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }, []);

    return (
        <Button
            className={ classNames(cls.LangSwitcher, {}, [className]) }
            theme={ ThemeButton.CLEAR }
            onClick={ toggleLang }
        >
            { t('Language') }
        </Button>
    );
};
