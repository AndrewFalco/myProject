import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../types/User';

export const getUserAuthData = (state: StateSchema) => state.user.authData;
export const getUserInited = (state: StateSchema) => state.user._inited;
export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

// export const hasUserRole = createSelector(getUserRoles, (roles) => !!roles?.includes(role));

export const isResolvedRole = createSelector(
    [getUserRoles, (_, resolvedRoles: UserRole[]) => resolvedRoles],
    (roles, resolvedRoles) =>
        Boolean(roles?.some((role) => resolvedRoles.includes(role))),
);
