import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRoute } from './providers/route';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeature } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppToolbar } from './lib/useAppToolbar';

import './styles/index.scss';

export const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

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
                        <MainLayout content={ <AppRoute /> }
                                    header={ <Navbar /> }
                                    sidebar={ <Sidebar /> }
                                    toolbar={ toolbar } />
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
    );
};
