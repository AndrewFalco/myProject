import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleSortValue = (state: StateSchema) => state.articlesPage?.sort || 'createAt';
export const getArticleOrderValue = (state: StateSchema) => state.articlesPage?.order || 'asc';
export const getArticleSearchValue = (state: StateSchema) => state.articlesPage?.search || '';
export const getArticleType = (state: StateSchema) => state.articlesPage?.type || 'ALL';
