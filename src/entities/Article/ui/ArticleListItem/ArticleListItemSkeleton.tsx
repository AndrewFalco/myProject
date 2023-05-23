import { ArticleView } from '../../model/types/article';
import { ToggleFeature } from '@/shared/lib/features';
import { ArticleListItemSkeletonRedesigned } from './new/ALISkeleton.new';
import { ArticleListItemSkeletonDeprecated } from './old/ALISkeleton.old';

interface ArticleSkeletonListProps {
    className?: string;
    view: ArticleView;
}

export const ArticleListItemSkeleton = (props: ArticleSkeletonListProps) => {
    const { className, view } = props;

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <ArticleListItemSkeletonRedesigned className={ className } view={ view } /> }
            off={ <ArticleListItemSkeletonDeprecated className={ className } view={ view } /> }
        />
    );
};
