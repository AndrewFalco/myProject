import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRoute } from './providers/route';
import { useTheme } from '../shared/lib/providers/ThemeProvider';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import './styles/index.scss';
import { PageLoader } from '@/widgets/PageLoader';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <React.StrictMode>
            <div className={ classNames('app', {}, [theme]) }>
                <Suspense fallback="">
                    <Navbar />
                    <div className="content-page">
                        <Sidebar />
                        { inited && <AppRoute /> }
                    </div>
                </Suspense>
            </div>
        </React.StrictMode>
    );
};
