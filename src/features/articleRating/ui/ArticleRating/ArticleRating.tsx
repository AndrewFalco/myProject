import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Rating } from '@/entities/Rating';
import { useGetArticleRating, useRateArticleRating } from '../../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { getArticleDetailsIsLoading } from '@/entities/Article';
import { ToggleFeature } from '@/shared/lib/features';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);

    const isDataLoading = useSelector(getArticleDetailsIsLoading);
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id || '',
    });
    const [rateArticleMutation] = useRateArticleRating();
    const rating = data?.[0];

    const rateHandler = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    userId: userData?.id || '',
                    rate: starsCount,
                    feedback,
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            rateHandler(starsCount);
        },
        [rateHandler],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            rateHandler(starsCount, feedback);
        },
        [rateHandler],
    );

    if (isLoading || isDataLoading) {
        return (
            <ToggleFeature
                feature="isAppRedesigned"
                on={ <Skeleton width="100%" height={ 100 } /> }
                off={ <SkeletonDeprecated width="100%" height={ 100 } /> }
            />
        );
    }

    return (
        <Rating
            onCancel={ onCancel }
            onAccept={ onAccept }
            title={ t('Please rate the article') || '' }
            className={ className }
            feedbackTitle={ t('Please set your feedback') || '' }
            hasFeedback
            rate={ rating?.rate }
        />
    );
});

export default ArticleRating;
