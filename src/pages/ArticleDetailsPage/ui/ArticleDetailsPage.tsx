import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { Button, Text } from 'shared/ui';
import { AddCommentForm } from 'features/addCommentForm';
import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';

import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string,
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const commentsError = useSelector(getArticleDetailsCommentsError);
    const navigate = useNavigate();

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <Page className={ classNames(cls.ArticleDetailsPage, {}, [className]) }>
                {
                  id
                    ? (
                        <div>
                            <Button onClick={ onBackToList }>
                                { t('Back to articles list') }
                            </Button>
                            <ArticleDetails articleId={ id } />
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
                                    <>
                                        <Text className={ cls.commentsTitle } title={ t('Comments') } />
                                        <AddCommentForm onSendComment={ onSendComment } />
                                        <CommentList comments={ comments } isLoading={ isLoading } />
                                    </>
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
