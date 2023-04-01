import { classNames } from 'shared/lib/classNames/classNames';
import {
    AppLink,
 Avatar, Button, Card, Icon, Text,
} from 'shared/ui';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { HTMLAttributeAnchorTarget, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Article, ArticleTextBlockType, ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';

interface ArticleListProps {
    className?: string,
    article: Article,
    view: ArticleView,
    target?: HTMLAttributeAnchorTarget,
}

export const ArticleListItem = (props: ArticleListProps) => {
    const {
        className, article, view, target,
    } = props;
    const { t } = useTranslation('article');

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
                            <AppLink
                              target={ target }
                              to={ RoutePath.articleDetails + article.id }
                            >
                                <Button>
                                    { t('Read more...') }
                                </Button>
                            </AppLink>
                            { views }
                        </div>
                    </Card>
                )
                : (
                    <AppLink
                      target={ target }
                      to={ RoutePath.articleDetails + article.id }
                    >
                        <Card>
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
                    </AppLink>
                )
            }
        </div>
    );
};
