import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/consts/routes';
import { AppRoutes, AppRouterProps } from '@/shared/types/routes';

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    main: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    settings: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
    about: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    adminPanel: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: ['ADMIN', 'MANAGER'],
    },
    forbidden: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    profile: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    articles: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    articleDetails: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    articleCreate: {
        path: getRouteArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    articleEdit: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    notFoundPage: {
        path: '*',
        element: <NotFoundPage />,
    },
};
