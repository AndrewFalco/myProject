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
import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slices/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsError, getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';

import cls from './ArticleDetailsPage.module.scss';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';

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

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => dispatch(fetchCommentsByArticleId(id)));

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <div className={ classNames(cls.ArticleDetailsPage, {}, [className]) }>
                {
                  id
                    ? (
                        <div className={ cls.detailsWrapper }>
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
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
