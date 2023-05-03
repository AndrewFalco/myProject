import { RouteProps } from 'react-router-dom';
// eslint-disable-next-line falco-custom-fsd-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean,
    roles?: UserRole[],
}

export type AppRoutes = 'main'
    | 'notFoundPage'
    | 'about'
    | 'profile'
    | 'forbidden'
    | 'articles'
    | 'articleDetails'
    | 'articleCreate'
    | 'articleEdit'
    | 'adminPanel';
