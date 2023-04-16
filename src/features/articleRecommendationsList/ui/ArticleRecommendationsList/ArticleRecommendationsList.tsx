import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { VStack, Text } from 'shared/ui';
import { ArticleList } from 'entities/Article';
import cls from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { data: articles, isLoading, error } = useArticleRecommendationsList(6);

    return (
        <VStack gap="8" className={ classNames(cls.ArticleRecommendationsList, {}, [className]) }>
            <Text title={ t('Recommendations') } />
            {
                !error
                    ? (
                        <ArticleList
                          articles={ articles || [] }
                          target="_blank"
                          isLoading={ isLoading }
                          withVirtualized={ false }
                        />
                    )
                    : <Text title={ t('Error with loading') } />
            }
        </VStack>
    );
});
