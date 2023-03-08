import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRoutes = 'main' | 'notFoundPage' | 'about' | 'profile';

export const RoutePath: Record<AppRoutes, string> = {
    main: '/',
    about: '/about',
    profile: '/profile',
    notFoundPage: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    about: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    profile: {
        path: RoutePath.profile,
        element: <ProfilePage />,
    },
    notFoundPage: {
        path: RoutePath.notFoundPage,
        element: <NotFoundPage />,
    },
};
