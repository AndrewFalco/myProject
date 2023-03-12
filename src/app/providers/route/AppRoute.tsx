import { getUserAuthData } from 'entities/User';
import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';

const AppRoute = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object.values(routeConfig).filter((route) => !(route.authOnly && !isAuth)), [isAuth]);

    return (
        <Routes>
            { routes.map(({ path, element }) => (
                <Route
                  key={ path }
                  path={ path }
                  element={ (
                      <Suspense fallback={ <PageLoader /> }>
                          <div className="page-wrapper">
                              { element }
                          </div>
                      </Suspense>
                ) }
                />
        )) }
        </Routes>
    );
};

export default memo(AppRoute);
