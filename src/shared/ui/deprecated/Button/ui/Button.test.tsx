import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('button tests', () => {
    test('to be in document', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('have a class', () => {
        render(<Button theme="clear">TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
