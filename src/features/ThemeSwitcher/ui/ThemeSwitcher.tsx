import { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import DarkIco from '@/shared/assets/icons/theme-dark.svg';
import LightIco from '@/shared/assets/icons/theme-light.svg';
import { Button } from '@/shared/ui/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme';

import cls from './ThemeSwitcher.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <Button
            theme="clear"
            className={ classNames(cls.ThemeSwitcher, {}, [className]) }
            onClick={ onToggleHandler }
        >
            { theme === 'app_dark_theme' ? <DarkIco /> : <LightIco /> }
        </Button>
    );
});
