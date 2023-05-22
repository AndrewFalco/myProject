import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../types/User';
import { buildSelector } from '@/shared/lib/store';
import { JsonSettings } from '../types/jsonSettings';

const defaultJsonSettings: JsonSettings = {};

export const [useUserAuthData, getUserAuthData] = buildSelector(
    (state) => state.user?.authData,
);
export const [useUserInited, getUserInited] = buildSelector(
    (state) => state.user._inited,
);
export const [useUserRoles, getUserRoles] = buildSelector(
    (state) => state.user.authData?.roles,
);
export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user.authData?.jsonSettings ?? defaultJsonSettings,
);
export const [useJsonSettingsByKey, getJsonSettingsByKey] = buildSelector(
    (state, key: keyof JsonSettings) =>
        state.user.authData?.jsonSettings?.[key],
);

export const isResolvedRole = createSelector(
    [getUserRoles, (_, resolvedRoles: UserRole[]) => resolvedRoles],
    (roles, resolvedRoles) =>
        Boolean(roles?.some((role) => resolvedRoles.includes(role))),
);
