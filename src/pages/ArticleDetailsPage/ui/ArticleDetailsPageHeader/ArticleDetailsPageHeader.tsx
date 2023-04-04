import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
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
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEdit = useCallback(() => {
        navigate(`${RoutePath.articleDetails}${article?.id}/edit`);
    }, [article?.id, navigate]);

    return (
        <div className={ classNames(cls.ArticleDetailsPageHeader, {}, [className]) }>
            <Button onClick={ onBackToList }>
                { t('Back to articles list') }
            </Button>
            {
                canEdit
                    && (
                        <Button
                          onClick={ onEdit }
                          colorType="success"
                        >
                            { t('Edit') }
                        </Button>
                    )
            }
        </div>
    );
};
