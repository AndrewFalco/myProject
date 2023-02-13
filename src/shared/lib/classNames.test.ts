import { classNames } from './classNames';

describe('classNames', () => {
    test('with only 1 param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional class', () => {
        expect(classNames('someClass', {}, ['cl1', 'cl2']))
            .toBe('someClass cl1 cl2');
    });

    test('with mode', () => {
        expect(classNames('someClass', { hovered: true, scrollable: true }, ['cl1', 'cl2']))
            .toBe('someClass cl1 cl2 hovered scrollable');
    });
});
