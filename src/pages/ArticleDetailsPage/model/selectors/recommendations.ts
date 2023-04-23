import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesRecommendationsIsLoading = (state: StateSchema) => state.articleDetailsPage?.recommendations?.isLoading;
export const getArticlesRecommendationsError = (state: StateSchema) => state.articleDetailsPage?.recommendations?.error;
