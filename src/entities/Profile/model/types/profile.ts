import { Country, Currency } from 'shared/consts/common';

export interface ProfileType {
    'firstName': string;
    'lastName': string;
    'email': string;
    'phone': string;
    'country': Country;
    'city': string;
    'age': number;
    'username': string;
    'avatar': string;
    'currency': Currency;
}

export interface ProfileSchema {
    data?: ProfileType;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
}
