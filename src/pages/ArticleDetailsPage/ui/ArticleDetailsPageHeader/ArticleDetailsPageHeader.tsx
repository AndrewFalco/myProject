import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLink, Button, HStack } from '@/shared/ui';
import { getArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';
import { getRoutArticleEdit, getRoutArticles } from '@/shared/consts/routes';

export const ArticleDetailsPageHeader = memo(() => {
    const { t } = useTranslation('article-details');
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    return (
        <HStack justify="between">
            <AppLink to={ getRoutArticles() }>
                <Button>
                    { t('Back to articles list') }
                </Button>
            </AppLink>
            {
                canEdit && article
                    && (
                        <AppLink to={ getRoutArticleEdit(article.id) }>
                            <Button colorType="success">
                                { t('Edit') }
                            </Button>
                        </AppLink>
                    )
            }
        </HStack>
    );
});
