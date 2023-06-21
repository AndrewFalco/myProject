import { StateSchema } from '@/app/providers/StoreProvider';
import { commentsAdapter } from '../slices/articleDetailsCommentsSlice';

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

export const getArticleDetailsCommentsIsLoading = (state: StateSchema) => state.articleDetailsPage?.comments?.isLoading;
export const getArticleDetailsCommentsError = (state: StateSchema) => state.articleDetailsPage?.comments?.error;
