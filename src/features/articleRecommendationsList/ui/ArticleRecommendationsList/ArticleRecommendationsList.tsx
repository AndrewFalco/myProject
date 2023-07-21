import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleList } from '@/entities/Article';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeature } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { data: articles, isLoading, error } = useArticleRecommendationsList(6);

    return (
        <VStack gap="8"
                className={ className }
                data-testid="ArticleDetails.Recommendation">
            <ToggleFeature
                feature="isAppRedesigned"
                on={ <Text title={ t('Recommendations') } /> }
                off={ <TextDeprecated title={ t('Recommendations') } /> }
            />
            { !error ? (
                <ArticleList articles={ articles || [] }
                             target="_blank"
                             isLoading={ isLoading }
                             withVirtualized={ false } />
            ) : (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <Text title={ t('Error with loading') } /> }
                    off={ <TextDeprecated title={ t('Error with loading') } /> }
                />
            ) }
        </VStack>
    );
});
