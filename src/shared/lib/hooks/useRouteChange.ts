import { useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { AppRoutes } from '@/shared/types/routes';
import { AppRouteByPathPattern } from '@/shared/consts/routes';

export const useRouteChange = (): AppRoutes => {
    const location = useLocation();
    const [appRoute, setAppRoute] = useState<AppRoutes>('main');

    useEffect(() => {
        Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route);
            }
        });
    }, [location.pathname]);

    return appRoute;
};
