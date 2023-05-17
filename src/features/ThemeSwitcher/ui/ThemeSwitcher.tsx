import { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

import cls from './ThemeSwitcher.module.scss';

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
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <Icon
                    Svg={ ThemeIcon }
                    onClick={ onToggleHandler }
                    clickable
                /> }
            off={
                <ButtonDeprecated
                    theme="clear"
                    className={ classNames(cls.ThemeSwitcher, {}, [className]) }
                    onClick={ onToggleHandler }
                >
                    <IconDeprecated
                        Svg={ ThemeIconDeprecated }
                        width={ 40 }
                        height={ 40 }
                    />
                </ButtonDeprecated>
            }
        />
    );
});
