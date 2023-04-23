import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLink, Button, HStack } from '@/shared/ui';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';

export const ArticleDetailsPageHeader = memo(() => {
    const { t } = useTranslation('article-details');
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    return (
        <HStack justify="between">
            <AppLink to={ RoutePath.articles }>
                <Button>
                    { t('Back to articles list') }
                </Button>
            </AppLink>
            {
                canEdit
                    && (
                        <AppLink to={ `${RoutePath.articleDetails}${article?.id}/edit` }>
                            <Button colorType="success">
                                { t('Edit') }
                            </Button>
                        </AppLink>
                    )
            }
        </HStack>
    );
});
