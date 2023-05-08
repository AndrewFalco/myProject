import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/test/componentRender/componentRender';
import AppRoute from './AppRoute';
import { getRoutAbout, getRoutAdminPanel, getRoutProfile } from '@/shared/consts/routes';

describe('app/providers/routes', () => {
    test('should be rendered', async () => {
        componentRender(<AppRoute />, {
            route: getRoutAbout(),
        });

        const page = await screen.findByTestId('AboutPage');
        expect(page).toBeInTheDocument();
    });
    test('page not found', async () => {
        componentRender(<AppRoute />, {
            route: '/notFoundGGG',
        });

        const page = await screen.findByTestId('NotFoundPage');
        expect(page).toBeInTheDocument();
    });
    test('redirect unauthorized user', async () => {
        componentRender(<AppRoute />, {
            route: getRoutProfile('1'),
        });

        const page = await screen.findByTestId('MainPage');
        expect(page).toBeInTheDocument();
    });
    test('access to private page for authorized user', async () => {
        componentRender(<AppRoute />, {
            route: getRoutAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {
                        id: '1',
                        roles: ['ADMIN'],
                    },
                },
            },
        });

        const page = await screen.findByTestId('AdminPanelPage');
        expect(page).toBeInTheDocument();
    });
    test('access denied (low permissions)', async () => {
        componentRender(<AppRoute />, {
            route: getRoutAdminPanel(),
            initialState: {
                user: {
                    _inited: true,
                    authData: {},
                },
            },
        });

        const page = await screen.findByTestId('ForbiddenPage');
        expect(page).toBeInTheDocument();
    });
});
