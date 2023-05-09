describe('Go to articles page', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit('articles');
        });
    });
    it('and loading some articles', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
