import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Text } from '@/shared/ui/redesigned/Text';
import { getArticleDetailsError } from '@/entities/Article';
import {
    getArticleDetailsCommentsIsLoading,
    getArticleDetailsCommentsError,
    getArticleComments,
} from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import cls from './ArticleDetailsComments.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

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
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <Text
                    className={ cls.commentsTitle }
                    title={ t('Error with comments loading') }
                    text={ t(commentsError || 'unknown error') }
                    variant="error"
                />
            }
            off={
                <TextDeprecated
                    className={ cls.commentsTitle }
                    title={ t('Error with comments loading') }
                    text={ t(commentsError || 'unknown error') }
                    theme="error"
                />
            }
        />
    ) : (
        <div className={ cls.commentBlockWrapper }>
            <ToggleFeature
                feature="isAppRedesigned"
                on={ <Text className={ cls.commentsTitle } title={ t('Comments') } /> }
                off={ <TextDeprecated className={ cls.commentsTitle } title={ t('Comments') } /> }
            />
            <AddCommentForm onSendComment={ onSendComment } />
            <CommentList comments={ comments } isLoading={ isLoading } />
        </div>
    );
};
