import { Country } from 'entities/Country';
import { Sex } from 'shared/consts/common';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/test/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
    id: '1',
    firstName: 'Levi',
    lastName: 'Santor',
    email: 'jabaTop@toptop.com',
    phone: '+7777777777',
    city: 'Kostenevo',
    age: 30,
    username: 'JabaTop',
    avatar: '',
    country: 'Russian Federation' as Country,
    currency: 'RUB' as Currency,
    sex: 'male' as Sex,
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk(data.id);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.reject());
        const result = await thunk.callThunk(data.id);

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
