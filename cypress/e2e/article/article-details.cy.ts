let currentArticleId = '';

describe('Go on article page', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.createArticle().then((article) => {
                currentArticleId = article.id;
                cy.visit(`articles/${article.id}`);
            });
        });
    });

    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it('and looks content', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('and looks recommendation list', () => {
        cy.getByTestId('ArticleDetails.Recommendation').should('exist');
    });

    it('and sent comment', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
});
