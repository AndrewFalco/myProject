import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { Page } from '@/widgets/Page';
import { ArticleRating } from '@/features/articleRating';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import cls from './ArticleDetailsPage.module.scss';
import { getFeatureFlags, toggleFeatures } from '@/shared/lib/features';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();
    const isArticleRatingEnabled = getFeatureFlags('isArticleRatingEnabled');

    if (!id) {
        return null;
    }

    const rating = toggleFeatures({
        name: 'isArticleRatingEnabled',
        // eslint-disable-next-line react/no-unstable-nested-components
        on: () => <ArticleRating articleId={ id } />,
        // eslint-disable-next-line react/no-unstable-nested-components
        off: () => <div>10100001010100101</div>,
    });

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <Page
                className={ classNames(cls.ArticleDetailsPage, {}, [className]) }
                error={ !id ? t('Article is not found') : undefined }
                data-testid="ArticleDetailsPage"
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails articleId={ id } />
                { isArticleRatingEnabled && <ArticleRating articleId={ id } /> }
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={ id } />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
