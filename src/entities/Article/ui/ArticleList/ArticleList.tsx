import { HTMLAttributeAnchorTarget, MutableRefObject, useCallback } from 'react';
import { Virtualize as VirtualizeDeprecated } from '@/shared/ui/deprecated';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ToggleFeature } from '@/shared/lib/features';
import { Virtualize, VirtualizeProps } from '@/shared/ui/redesigned/Virtualize';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    onScrollEnd?: () => void;
    parentRef?: MutableRefObject<HTMLDivElement>;
    withVirtualized?: boolean;
    lastIndex?: number;
    setLastIndex?: (index: number) => void;
}

export const ArticleList = (props: ArticleListProps) => {
    const {
        className,
        articles,
        view = 'GRID',
        isLoading,
        target,
        onScrollEnd,
        parentRef,
        withVirtualized = true,
        lastIndex,
        setLastIndex,
    } = props;

    const renderArticles = useCallback(
        (index: number, article: Article) => (
            <ArticleListItem
                article={ article }
                view={ view }
                key={ article.id }
                target={ target }
                index={ index }
                setLastIndex={ setLastIndex }
            />
        ),
        [setLastIndex, target, view],
    );

    const renderSkeleton = useCallback((index: number) => <ArticleListItemSkeleton view={ view } key={ index } />, [view]);

    const vProps: VirtualizeProps<Article> = {
        data: articles.length ? articles : Array(3).fill(0),
        renderNode: renderArticles,
        view,
        isLoading,
        renderSkeleton,
        onScrollEnd,
        parentRef,
        lastIndex,
    };

    return (
        <HStack data-testid="ArticleList"
                wrap="nowrap"
                gap="16"
                className={ className }
                max>
            { withVirtualized ? (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <Virtualize { ...vProps } /> }
                    off={ <VirtualizeDeprecated { ...vProps } /> }
                />
            ) : (
                <>
                    { articles.length ? articles.map((article, index) => renderArticles(index, article)) : null }
                    { isLoading && new Array(view === 'LIST' ? 3 : 9).fill(0).map((elem, index) => renderSkeleton(index)) }
                </>
            ) }
        </HStack>
    );
};
