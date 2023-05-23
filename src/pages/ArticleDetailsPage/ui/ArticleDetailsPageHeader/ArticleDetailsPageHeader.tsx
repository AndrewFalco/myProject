import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLink, Button, HStack } from '@/shared/ui/deprecated';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/routes';
import { getCanEditArticle } from '../../model/selectors/article';

export const ArticleDetailsPageHeader = memo(() => {
    const { t } = useTranslation('article-details');
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    return (
        <HStack justify="between">
            <AppLink to={ getRouteArticles() }>
                <Button>{ t('Back to articles list') }</Button>
            </AppLink>
            { canEdit && article && (
                <AppLink to={ getRouteArticleEdit(article.id) }>
                    <Button colorType="success">{ t('Edit') }</Button>
                </AppLink>
            ) }
        </HStack>
    );
});
