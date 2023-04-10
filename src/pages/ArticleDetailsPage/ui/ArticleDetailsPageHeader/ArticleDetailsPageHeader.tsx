import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, Button } from 'shared/ui';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from '../../model/selectors/article';

import cls from './ArticleDetailsPageHeader.module.scss';

interface ArticleDetailsPageHeaderProps {
    className?: string,
}

export const ArticleDetailsPageHeader = (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    return (
        <div className={ classNames(cls.ArticleDetailsPageHeader, {}, [className]) }>
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
        </div>
    );
};
