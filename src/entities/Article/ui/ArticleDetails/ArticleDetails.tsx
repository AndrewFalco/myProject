import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { Text, Skeleton } from 'shared/ui';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import { getArticleDetailsData } from '../../model/selectors/getArticleDetailsData/getArticleDetailsData';
import { getArticleDetailsError } from '../../model/selectors/getArticleDetailsError/getArticleDetailsError';
import { getArticleDetailsIsLoading } from '../../model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
import cls from './ArticleDetails.module.scss';
import { ArticleDetailsContent } from './ArticleDetailsContent';

interface ArticleDetailsProps {
    className?: string,
    articleId: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const data = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);
    const isLoading = useSelector(getArticleDetailsIsLoading);

    useInitialEffect(() => dispatch(fetchArticleById(articleId)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <div className={ classNames(cls.ArticleDetails, {}, [className]) }>
                {
                    isLoading
                    ? (
                        <div className={ cls.skeletonsWrapper }>
                            <Skeleton className={ cls.avatar } width={ 200 } height={ 200 } borderRadius="50%" />
                            <Skeleton className={ cls.title } width={ 300 } height={ 24 } />
                            <Skeleton className={ cls.skeleton } width={ 600 } height={ 24 } />
                            <Skeleton className={ cls.skeleton } width="100%" height={ 200 } />
                            <Skeleton className={ cls.skeleton } width="100%" height={ 200 } />
                        </div>
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
            </div>
        </DynamicModuleLoader>
    );
});
