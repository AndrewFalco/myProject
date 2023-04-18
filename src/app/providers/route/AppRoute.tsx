import {
 memo, Suspense, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRouterProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

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
