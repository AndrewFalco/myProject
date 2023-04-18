import { getUserAuthData, getUserRoles } from 'entities/User';
import { UserRole } from 'entities/User/model/types/User';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

type RequireAuthProps = {
    children: JSX.Element,
    roles?: UserRole[],
}

export const RequireAuth = (props: RequireAuthProps) => {
    const { children, roles } = props;
    const auth = useSelector(getUserAuthData);
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequiredRoles = useMemo(
        () => (roles ? roles.some((role) => userRoles?.includes(role)) : true),
        [roles, userRoles],
    );

    if (!auth) {
      return (
          <Navigate
            to={ RoutePath.main }
            state={ { from: location } }
            replace
          />
        );
    }

    if (!hasRequiredRoles) {
      return (
          <Navigate
            to={ RoutePath.forbidden }
            state={ { from: location } }
            replace
          />
        );
    }

    return children;
};
