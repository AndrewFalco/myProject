import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = (props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        order,
        sort,
        search,
        type,
    } = useArticlesFilters();

    return (
        <ArticleFilters
            className={ className }
            onChangeOrder={ onChangeOrder }
            onChangeSearch={ onChangeSearch }
            onChangeSort={ onChangeSort }
            onChangeType={ onChangeType }
            order={ order }
            search={ search }
            sort={ sort }
            typeValue={ type }
        />
    );
};
