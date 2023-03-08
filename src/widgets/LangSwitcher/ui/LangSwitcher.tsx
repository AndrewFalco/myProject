import { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';

interface LangSwitcherProps {
    className?: string,
    collapsed?: boolean
}

const LangSwitcherComponent: FC<LangSwitcherProps> = (props) => {
    const { className = '', collapsed } = props;
    const { t, i18n } = useTranslation();

    const toggleLang = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }, [i18n]);

    return (
        <Button
            className={ classNames(className) }
            theme="clear"
            onClick={ toggleLang }
        >
            { collapsed ? t('Short language') : t('Language') }
        </Button>
    );
};

export const LangSwitcher = memo(LangSwitcherComponent);
