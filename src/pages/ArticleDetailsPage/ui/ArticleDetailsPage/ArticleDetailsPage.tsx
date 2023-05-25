import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { Page } from '@/widgets/Page';
import { ArticleRating } from '@/features/articleRating';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ToggleFeature } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import cls from './ArticleDetailsPage.module.scss';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

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

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={ reducers }>
            <ToggleFeature
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                className={ classNames(cls.ArticleDetailsPage, {}, [className]) }
                                error={ !id ? t('Article is not found') : undefined }
                                data-testid="ArticleDetailsPage"
                            >
                                <DetailsContainer />
                                <ArticleRating articleId={ id } className={ cls.rating } />
                                <ArticleRecommendationsList className={ cls.recommendations } />
                                <ArticleDetailsComments id={ id } />
                            </Page>
                        }
                        right={ <AdditionalInfoContainer /> }
                    />
                }
                off={
                    <Page
                        className={ classNames(cls.ArticleDetailsPage, {}, [className]) }
                        error={ !id ? t('Article is not found') : undefined }
                        data-testid="ArticleDetailsPage"
                    >
                        <ArticleDetailsPageHeader />
                        <ArticleDetails articleId={ id } />
                        <ArticleRating articleId={ id } />
                        <ArticleRecommendationsList className={ cls.recommendations } />
                        <ArticleDetailsComments id={ id } />
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
