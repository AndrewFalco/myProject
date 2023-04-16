import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { Text, Skeleton, VStack } from 'shared/ui';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import { getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import { ArticleDetailsContent } from './ArticleDetailsContent';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    articleId?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { articleId } = props;
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);

    useInitialEffect(() => articleId && dispatch(fetchArticleById(articleId)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <VStack max grow gap="8" className={ cls.wrapper }>
                {
                    isLoading
                    ? (
                        <VStack gap="16" max grow>
                            <Skeleton width="100%" height={ 200 } />
                            <Skeleton className={ cls.title } width={ 300 } height={ 24 } />
                            <Skeleton width="100%" height={ 24 } />
                            <Skeleton width="100%" height={ 200 } />
                            <Skeleton width="100%" height={ 200 } />
                        </VStack>
                    )
                    : (
                        error || !data
                            ? (
                                <Text
                                  title={ t(error || 'Error with fetching article details') }
                                  align="center"
                                  theme="error"
                                />
                            )
                            : <ArticleDetailsContent data={ data } />
                    )
                }
            </VStack>
        </DynamicModuleLoader>
    );
});
