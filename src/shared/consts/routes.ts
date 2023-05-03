import { AppRoutes } from '../types/routes';

export const RoutePath: Record<AppRoutes, string> = {
    main: '/',
    about: '/about',
    adminPanel: '/admin',
    forbidden: '/forbidden',
    profile: '/profile/',
    articles: '/articles',
    articleCreate: '/articles/new',
    articleEdit: '/articles/:id/edit',
    articleDetails: '/articles/',
    notFoundPage: '*',
};
