import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RoutePath } from '@/shared/consts/routes';
import { AppRoutes, AppRouterProps } from '@/shared/types/routes';

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    about: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    adminPanel: {
        path: RoutePath.adminPanel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: ['ADMIN', 'MANAGER'],
    },
    forbidden: {
        path: RoutePath.forbidden,
        element: <ForbiddenPage />,
    },
    profile: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    articles: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    articleDetails: {
        path: `${RoutePath.articleDetails}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    articleCreate: {
        path: `${RoutePath.articleCreate}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    articleEdit: {
        path: `${RoutePath.articleEdit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    notFoundPage: {
        path: RoutePath.notFoundPage,
        element: <NotFoundPage />,
    },
};
