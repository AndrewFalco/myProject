import { userActions } from 'entities/User';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRoute } from './providers/route';
import { useTheme } from './providers/ThemeProvider';

import './styles/index.scss';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <React.StrictMode>
            <div className={ classNames('app', {}, [theme]) }>
                <Suspense fallback="">
                    <Navbar />
                    <div className="content-page">
                        <Sidebar />
                        <AppRoute />
                    </div>
                </Suspense>
            </div>
        </React.StrictMode>
    );
};
