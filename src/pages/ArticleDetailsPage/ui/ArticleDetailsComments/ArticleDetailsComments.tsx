import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Text } from '@/shared/ui/deprecated';
import { getArticleDetailsError } from '@/entities/Article';
import { getArticleDetailsCommentsIsLoading, getArticleDetailsCommentsError } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsComments.module.scss';

type ArticleDetailsCommentsType = {
    id?: string;
};

export const ArticleDetailsComments = (props: ArticleDetailsCommentsType) => {
    const { id } = props;
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const commentsError = useSelector(getArticleDetailsCommentsError);
    const articleError = useSelector(getArticleDetailsError);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return articleError || commentsError ? (
        <Text
            className={ cls.commentsTitle }
            title={ t('Error with comments loading') }
            text={ t(commentsError || 'unknown error') }
            theme="error"
        />
    ) : (
        <div className={ cls.commentBlockWrapper }>
            <Text className={ cls.commentsTitle } title={ t('Comments') } />
            <AddCommentForm onSendComment={ onSendComment } />
            <CommentList comments={ comments } isLoading={ isLoading } />
        </div>
    );
};
