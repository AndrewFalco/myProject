import { ProfileError, ProfileType } from 'entities/Profile';

export interface ProfileSchema {
    data?: ProfileType;
    form?: ProfileType;
    isLoading?: boolean;
    error?: ProfileError[];
    readonly: boolean;
}
