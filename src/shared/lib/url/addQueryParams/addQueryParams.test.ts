import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('test addQueryParams with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toBe('?test=value');
    });
    test('test addQueryParams with many param', () => {
        const params = getQueryParams({
            test: 'value',
            count: '10',
        });
        expect(params).toBe('?test=value&count=10');
    });
    test('test addQueryParams without param', () => {
        const params = getQueryParams({});
        expect(params).toBe('?');
    });
});
