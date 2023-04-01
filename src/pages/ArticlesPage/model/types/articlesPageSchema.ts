import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';
import { ArticleSortField } from 'features/ArticleSort';
import { SortOrder } from 'shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit: number;
    hasMore: boolean;
    _inited: boolean;
    search: string;
    sort: ArticleSortField,
    order: SortOrder,
    type: ArticleType,
}
