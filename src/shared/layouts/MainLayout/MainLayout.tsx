import { ReactElement, useRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainLayout.module.scss';
import { MainLayoutContext } from './lib/hoc/MainLayoutContext';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { className, content, sidebar, toolbar, header } = props;

    const ref = useRef(null);

    return (
        <MainLayoutContext.Provider value={ ref }>
            <div ref={ ref } className={ classNames(cls.MainLayout, {}, [className]) }>
                <div className={ cls.sidebar }>{ sidebar }</div>
                <div className={ cls.content }>{ content }</div>
                <div className={ cls.rightBar }>
                    <div className={ cls.header }>{ header }</div>
                    <div className={ cls.toolbar }>{ toolbar }</div>
                </div>
            </div>
        </MainLayoutContext.Provider>
    );
};
