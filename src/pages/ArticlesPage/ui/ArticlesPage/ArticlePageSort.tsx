import { ArticleSort } from '@/features/ArticleSort';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

export const ArticlePageSort = () => {
    const {
        view,
        type,
        onChangeOrder,
        onChangeSearch,
        onChangeSort,
        onChangeType,
        onChangeView,
        order,
        search,
        sort,
    } = useArticlesFilters();

    return (
        <ArticleSort
            order={ order }
            search={ search }
            sort={ sort }
            onChangeView={ onChangeView }
            onChangeSort={ onChangeSort }
            onChangeOrder={ onChangeOrder }
            onChangeSearch={ onChangeSearch }
            onChangeType={ onChangeType }
            view={ view }
            typeValue={ type }
        />
    );
};
