import { Country, Currency, Sex } from 'shared/consts/common';

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
    error?: string;
    readonly: boolean;
}
