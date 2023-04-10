import { memo } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';

import DarkIco from 'shared/assets/icons/theme-dark.svg';
import LightIco from 'shared/assets/icons/theme-light.svg';
import { Button } from 'shared/ui/Button';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string,
}

const ThemeSwitcherComponent = (props: ThemeSwitcherProps) => {
    const { className } = props;
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
          theme="clear"
          className={ classNames(cls.ThemeSwitcher, {}, [className]) }
          onClick={ toggleTheme }
        >
            { theme === 'app_dark_theme' ? <DarkIco /> : <LightIco /> }
        </Button>
    );
};

export const ThemeSwitcher = memo(ThemeSwitcherComponent);
