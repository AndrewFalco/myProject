import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Gender } from '@/shared/consts/common';
import { getProfileData } from './getProfileData';

const data = {
    firstName: 'Levi',
    lastName: 'Santor',
    email: 'jabaTop@toptop.com',
    phone: '+7777777777',
    country: 'Russian Federation' as Country,
    city: 'Kostenevo',
    age: 30,
    username: 'JabaTop',
    avatar: '',
    currency: 'RUB' as Currency,
    sex: 'male' as Gender,
};

describe('getProfileData.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
