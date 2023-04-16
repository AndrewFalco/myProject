import { Sex } from 'shared/consts/common';
import { Country } from '../../../Country';
import { Currency } from '../../../Currency';

export interface ProfileType {
    id?: string;
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

export type ProfileError = {
    key: string,
    text: string,
}
