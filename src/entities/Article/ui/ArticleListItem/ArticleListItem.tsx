import { classNames } from 'shared/lib/classNames/classNames';
import {
 Avatar, Button, Card, Icon, Text,
} from 'shared/ui';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Article, ArticleTextBlockType, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';

interface ArticleListProps {
    className?: string,
    article: Article,
    view: ArticleView,
}

export const ArticleListItem = (props: ArticleListProps) => {
    const { className, article, view } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.articleDetails + article.id);
    }, [article.id, navigate]);

    const types = useMemo(() => <Text text={ article.type.join(', ') } className={ cls.types } />, [article.type]);
    const views = useMemo(() => (
        <div className={ cls.viewsBlock }>
            <Text text={ String(article.views) } className={ cls.views } />
            <Icon Svg={ EyeIcon } />
        </div>
    ), [article.views]);

    const textBlock = article.blocks.find((block) => block.type === 'TEXT') as ArticleTextBlockType;

    return (
        <div className={ classNames(cls.ArticleListItem, {}, [className, cls[view]]) }>
            {
              view === 'LIST'
                ? (
                    <Card>
                        <div className={ cls.header }>
                            <div className={ cls.userInfo }>
                                <Avatar src={ article.user.avatar } size={ 30 } />
                                <Text text={ article.user.username } className={ cls.username } />
                            </div>
                            <Text text={ new Date(article.createdAt).toLocaleDateString() } className={ cls.date } />
                        </div>
                        <Text title={ article.title } className={ cls.title } />
                        { types }
                        <img src={ article.img } className={ cls.img } alt={ article.title } />
                        {
                          textBlock && (
                              <ArticleTextBlock block={ textBlock } className={ cls.paragraph } />
                          )
                        }
                        <div className={ cls.footer }>
                            <Button onClick={ onOpenArticle }>
                                { t('Read more...') }
                            </Button>
                            { views }
                        </div>
                    </Card>
                )
                : (
                    <Card onClick={ onOpenArticle }>
                        <div className={ cls.imageWrapper }>
                            <img src={ article.img } className={ cls.img } alt={ article.title } />
                            <Text text={ new Date(article.createdAt).toLocaleDateString() } className={ cls.date } />
                        </div>
                        <div className={ cls.infoWrapper }>
                            { types }
                            { views }
                        </div>
                        <Text text={ article.title } className={ cls.title } />
                    </Card>
                )
            }
        </div>
    );
};
