import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/test/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('sidebar tests', () => {
    test('to be in document', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sb')).toBeInTheDocument();
    });

    test('to be in document toggle', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sb-toggle')).toBeInTheDocument();
    });

    test('test collapse class', () => {
        componentRender(<Sidebar />);
        const toggle = screen.getByTestId('sb-toggle');
        expect(screen.getByTestId('sb')).toBeInTheDocument();
        fireEvent.click(toggle);
        expect(screen.getByTestId('sb')).toHaveClass('collapsed');
    });
});
