import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Sex } from 'shared/consts/common';

export type ProfileError = {
    key: string,
    text: string,
}

export interface ProfileType {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    country?: Country;
    city?: string;
    age?: number;
    username?: string;
    avatar?: string;
    currency?: Currency;
    sex?: Sex;
}

export interface ProfileSchema {
    data?: ProfileType;
    form?: ProfileType;
    isLoading?: boolean;
    error?: ProfileError[];
    readonly: boolean;
}
