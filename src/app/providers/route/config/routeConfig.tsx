import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
    getRoutAbout, getRoutAdminPanel, getRoutArticleCreate,
    getRoutArticleDetails, getRoutArticleEdit, getRoutArticles,
    getRoutForbidden, getRoutMain, getRoutProfile,
} from '@/shared/consts/routes';
import { AppRoutes, AppRouterProps } from '@/shared/types/routes';

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    main: {
        path: getRoutMain(),
        element: <MainPage />,
    },
    about: {
        path: getRoutAbout(),
        element: <AboutPage />,
    },
    adminPanel: {
        path: getRoutAdminPanel(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: ['ADMIN', 'MANAGER'],
    },
    forbidden: {
        path: getRoutForbidden(),
        element: <ForbiddenPage />,
    },
    profile: {
        path: getRoutProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    articles: {
        path: getRoutArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    articleDetails: {
        path: getRoutArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    articleCreate: {
        path: getRoutArticleCreate(),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    articleEdit: {
        path: getRoutArticleEdit(':id'),
        element: <ArticleEditPage />,
        authOnly: true,
    },
    notFoundPage: {
        path: '*',
        element: <NotFoundPage />,
    },
};
