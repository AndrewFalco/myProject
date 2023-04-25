import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack, Text } from '@/shared/ui';
import { ArticleList } from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { data: articles, isLoading, error } = useArticleRecommendationsList(6);

    return (
        <VStack gap="8" className={ className }>
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
