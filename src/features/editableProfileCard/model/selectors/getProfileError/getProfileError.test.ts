import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

const error = [{
    key: 'loading',
    text: 'Error with loading',
}];

describe('getProfileError.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error,
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual(error);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
