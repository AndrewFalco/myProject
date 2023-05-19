import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRoute } from './providers/route';
import { useTheme } from '../shared/lib/providers/ThemeProvider';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeature } from '@/shared/lib/features';

import './styles/index.scss';
import { MainLayout } from '@/shared/layouts/MainLayout';

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
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <div className={ classNames('app_redesigned', {}, [theme]) }>
                    <Suspense fallback="">
                        <MainLayout
                            content={ <AppRoute /> }
                            header={ <Navbar /> }
                            sidebar={ <Sidebar /> }
                        />
                    </Suspense>
                </div>
            }
            off={
                <div className={ classNames('app', {}, [theme]) }>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRoute />
                        </div>
                    </Suspense>
                </div>
            }
        />
    )
};
