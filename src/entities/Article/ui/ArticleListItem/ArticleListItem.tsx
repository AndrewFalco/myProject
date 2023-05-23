import { HTMLAttributeAnchorTarget } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import { ToggleFeature } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './old/ArticleListItem.old';
import { ArticleListItemRedesigned } from './new/ArticleListItem.new';

export interface ArticleListProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    index?: number;
    setLastIndex?: (index: number) => void;
}

export const ArticleListItem = (props: ArticleListProps) => (
    <ToggleFeature
        feature="isAppRedesigned"
        on={ <ArticleListItemRedesigned { ...props } /> }
        off={ <ArticleListItemDeprecated { ...props } /> }
    />
);
