import { memo, Suspense, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from './config/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { AppRouterProps } from '@/shared/types/routes';

const AppRoute = () => {
    const renderWithWrapper = useCallback((route: AppRouterProps) => {
        const element = (
            <Suspense fallback={ <PageLoader /> }>
                { route.element }
            </Suspense>
        );

        return (
            <Route
              key={ route.path }
              path={ route.path }
              element={ route.authOnly
                ? <RequireAuth>{ element }</RequireAuth>
                : element }
            />
        );
    }, []);

    return (
        <Routes>
            { Object.values(routeConfig).map(renderWithWrapper) }
        </Routes>
    );
};

export default memo(AppRoute);
