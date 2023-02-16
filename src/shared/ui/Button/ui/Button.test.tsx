import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from 'shared/ui/Button';

describe('button tests', () => {
    test('to be in document', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('have a class', () => {
        render(<Button theme={ ThemeButton.CLEAR }>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
