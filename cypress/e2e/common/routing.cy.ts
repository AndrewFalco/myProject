import { selectByTestId } from '../../helpers/selectByTestId';

describe('template spec', () => {
    describe('User is authorized', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Go to Profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
    });

    describe('User is not authorized', () => {
        it('Main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Go to Profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Go to non-existent page', () => {
            cy.visit('/bskjdbf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
});
