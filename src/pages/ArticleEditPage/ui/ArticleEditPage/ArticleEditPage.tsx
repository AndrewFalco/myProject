import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToggleFeature } from '@/shared/lib/features';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    fetchArticleById,
    articleDetailsReducer,
} from '@/entities/Article';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { ArticleEditPageRedesigned } from './ArticleEditPage.new';
import { PageLoader } from '@/widgets/PageLoader';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleEditPage = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id?: string }>();

    const dispatch = useAppDispatch();
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);

    useInitialEffect(() => id && dispatch(fetchArticleById(id)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            { isLoading ? (
                <PageLoader />
            ) : error || !data ? (
                t('Error with loading')
            ) : (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <ArticleEditPageRedesigned data={ data } /> }
                    off={ <div>Coming soon... probably</div> }
                />
            ) }
        </DynamicModuleLoader>
    );
};

export default ArticleEditPage;
