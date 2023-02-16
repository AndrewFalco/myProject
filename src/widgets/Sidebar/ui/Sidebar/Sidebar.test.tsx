import { fireEvent, screen } from '@testing-library/react';
import renderWithTranslation from 'shared/lib/test/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('sidebar tests', () => {
    test('to be in document', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sb')).toBeInTheDocument();
    });

    test('test collapse class', () => {
        renderWithTranslation(<Sidebar />);
        const toggle = screen.getByTestId('sb-toggle');
        expect(screen.getByTestId('sb')).toBeInTheDocument();
        fireEvent.click(toggle);
        expect(screen.getByTestId('sb')).toHaveClass('collapsed');
    });
});
