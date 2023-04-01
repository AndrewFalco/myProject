import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { articleRecommendationsReducer } from './articleDetailsPageRecommendations';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
});
