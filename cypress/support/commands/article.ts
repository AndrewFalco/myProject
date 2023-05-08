import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'Scala news',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://software-expert.ru/wp-content/uploads/2022/10/0bb39554756548aeb19c1837204456e955.jpg',
    views: 10222,
    createdAt: '2023-02-13T12:50:32Z',
    userId: '1',
    type: [
        'IT',
    ],
    blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { Authorization: 'someToken' },
    body: article ?? defaultArticle,
}).then((response) => response.body);

export const removeArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'someToken' },
});

declare global {
    namespace Cypress {
      interface Chainable {
        createArticle(article?: Article): Chainable<Article>;
        removeArticle(articleId: string): Chainable<void>;
      }
    }
}
