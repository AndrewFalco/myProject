import { AppRoutes } from '../types/routes';

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteAdminPanel = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleCreate = () => '/article/new';
export const getRouteArticleEdit = (id: string) => `/article/${id}/edit`;
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteNotFoundPage = () => '*';
export const getRouteSettings = () => '/settings';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: 'main',
    [getRouteAbout()]: 'about',
    [getRouteAdminPanel()]: 'adminPanel',
    [getRouteForbidden()]: 'forbidden',
    [getRouteProfile(':id')]: 'profile',
    [getRouteArticles()]: 'articles',
    [getRouteArticleCreate()]: 'articleCreate',
    [getRouteArticleEdit(':id')]: 'articleEdit',
    [getRouteArticleDetails(':id')]: 'articleDetails',
    [getRouteSettings()]: 'settings',
};
