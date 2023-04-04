import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean,
}

export type AppRoutes = 'main'
    | 'notFoundPage'
    | 'about'
    | 'profile'
    | 'articles'
    | 'articleDetails'
    | 'articleCreate'
    | 'articleEdit';

export const RoutePath: Record<AppRoutes, string> = {
    main: '/',
    about: '/about',
    profile: '/profile/',
    articles: '/articles',
    articleCreate: '/articles/new',
    articleEdit: '/articles/:id/edit',
    articleDetails: '/articles/',
    notFoundPage: '*',
};

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    main: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    about: {
        path: RoutePath.about,
        element: <AboutPage />,
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
