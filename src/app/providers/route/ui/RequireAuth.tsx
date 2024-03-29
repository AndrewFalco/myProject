import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteMain } from '@/shared/consts/routes';

type RequireAuthProps = {
    children: JSX.Element;
    roles?: UserRole[];
};

export const RequireAuth = (props: RequireAuthProps) => {
    const { children, roles } = props;
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(
        () => (roles?.length ? roles.some((role) => userRoles?.includes(role)) : true),
        [roles, userRoles],
    );

    if (!auth) {
        return <Navigate to={ getRouteMain() } state={ { from: location } } replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={ getRouteForbidden() } state={ { from: location } } replace />;
    }

    return children;
};
