import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { ToggleFeature } from '@/shared/lib/features';

interface LangSwitcherProps {
    className?: string;
    collapsed?: boolean;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
    const { className = '', collapsed } = props;
    const { t, i18n } = useTranslation();

    const toggleLang = useCallback(() => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }, [i18n]);

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Button className={ classNames(className) }
                        variant="clear"
                        onClick={ toggleLang }>
                    { collapsed ? t('Short language') : t('Language') }
                </Button>
            }
            off={
                <ButtonDeprecated className={ classNames(className) }
                                  theme="clear"
                                  onClick={ toggleLang }>
                    { collapsed ? t('Short language') : t('Language') }
                </ButtonDeprecated>
            }
        />
    );
});
