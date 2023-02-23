import { Suspense, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, Modal } from 'shared/ui';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRoute } from './providers/route';
import { useTheme } from './providers/ThemeProvider';

import './styles/index.scss';

export const App = () => {
    const { theme } = useTheme();

    return (
        <div className={ classNames('app', {}, [theme]) }>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRoute />
                </div>
            </Suspense>
        </div>
    );
};
