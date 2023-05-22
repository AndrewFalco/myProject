import { ArticleViewSelector } from '@/features/ArticleSort';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = (props: ViewSelectorContainerProps) => {
    const { className } = props;
    const { view, onChangeView } = useArticlesFilters();

    return (
        <ArticleViewSelector
            className={ className }
            view={ view }
            onViewClick={ onChangeView }
        />
    );
};
