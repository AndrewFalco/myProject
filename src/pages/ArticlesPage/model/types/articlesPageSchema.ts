import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView, ArticleType } from '@/entities/Article';
import { ArticleSortField } from '@/features/ArticleSort';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit: number;
    hasMore: boolean;
    _inited: boolean;
    search: string;
    sort: ArticleSortField;
    order: SortOrder;
    type: ArticleType;
    lastOpenedArticleIndex?: number;
}
