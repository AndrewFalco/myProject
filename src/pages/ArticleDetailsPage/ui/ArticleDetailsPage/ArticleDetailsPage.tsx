import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Text } from 'shared/ui';
import { AddCommentForm } from 'features/addCommentForm';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { Page } from 'widgets/Page/Page';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleRecommendation } from '../../model/slices/articleDetailsPageRecommendations';
import { getArticlesRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { fetchArticlesRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?: string,
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const recommendations = useSelector(getArticleRecommendation.selectAll);
    const recIsLoading = useSelector(getArticlesRecommendationsIsLoading);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const commentsError = useSelector(getArticleDetailsCommentsError);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticlesRecommendations());
        dispatch(fetchCommentsByArticleId(id));
    });

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <Page className={ classNames(cls.ArticleDetailsPage, {}, [className]) }>
                <ArticleDetailsPageHeader />
                {
                  id
                    ? (
                        <div>
                            <ArticleDetails articleId={ id } />
                            <Text title={ t('Recommendations') } />
                            <ArticleList
                              articles={ recommendations }
                              isLoading={ recIsLoading }
                              className={ cls.recommendations }
                              target="_blank"
                              withVirtualized={ false }
                            />
                            {
                                commentsError
                                ? (
                                    <Text
                                      className={ cls.commentsTitle }
                                      title={ t('Error with comments loading') }
                                      text={ t(commentsError) }
                                      theme="error"
                                    />
                                )
                                : (
                                    <div className={ cls.commentBlockWrapper }>
                                        <Text className={ cls.commentsTitle } title={ t('Comments') } />
                                        <AddCommentForm onSendComment={ onSendComment } />
                                        <CommentList comments={ comments } isLoading={ isLoading } />
                                    </div>
                                )
                            }
                        </div>
                    )
                    : (
                        <Text
                          title={ t('Article is not found') }
                          theme="error"
                          align="center"
                        />
                    )
                }
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
