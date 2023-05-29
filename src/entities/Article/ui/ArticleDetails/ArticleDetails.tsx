import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import { getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import { ArticleDetailsContent } from './ArticleDetailsContent.new';
import { ArticleDetailsContent as ArticleDetailsContentDeprecated } from './ArticleDetailsContent.old';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import { ArticleDetailsError } from './ArticleDetailsError';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleDetailsProps {
    articleId?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { articleId } = props;
    const dispatch = useAppDispatch();
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);

    useInitialEffect(() => articleId && dispatch(fetchArticleById(articleId)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            { isLoading ? (
                <ArticleDetailsSkeleton />
            ) : error || !data ? (
                <ArticleDetailsError />
            ) : (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <ArticleDetailsContent data={ data } /> }
                    off={ <ArticleDetailsContentDeprecated data={ data } /> }
                />
            ) }
        </DynamicModuleLoader>
    );
});
