import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, Button } from 'shared/ui';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import MainIcon from 'shared/assets/icons/mainIco.svg';
import AboutIcon from 'shared/assets/icons/aboutIco.svg';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string,
}

export const Sidebar: FC<SidebarProps> = (props) => {
    const { className } = props;
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = (): void => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div
            data-testid="sb"
            className={ classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className]) }
        >
            <Button
                data-testid="sb-toggle"
                onClick={ onToggle }
                className={ classNames(cls.collapsedBtn) }
                theme="backgroundInverted"
                square
                size="sizeL"
            >
                { collapsed ? '>' : '<' }
            </Button>
            <div className={ cls.items }>
                <AppLink
                    to={ RoutePath.main }
                    className={ cls.item }
                    theme="secondary"
                >
                    <MainIcon className={ cls.icon } />
                    <span className={ classNames(cls.link) }>{ t('Main page') }</span>
                </AppLink>
                <AppLink
                    to={ RoutePath.about }
                    theme="secondary"
                    className={ cls.item }
                >
                    <AboutIcon className={ cls.icon } />
                    <span className={ cls.link }>{ t('About page') }</span>
                </AppLink>
            </div>
            <div className={ classNames(cls.switchers) }>
                <ThemeSwitcher />
                <LangSwitcher className={ cls.lang } collapsed={ collapsed } />
            </div>
        </div>
    );
};
