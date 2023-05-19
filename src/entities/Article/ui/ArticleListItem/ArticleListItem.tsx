import { HTMLAttributeAnchorTarget, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    AppLink,
    Avatar,
    Button,
    Card,
    HStack,
    Icon,
    Skeleton,
    Text,
    AppImage
} from '@/shared/ui';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import {
    Article,
    ArticleTextBlockType,
    ArticleView,
} from '../../model/types/article';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';
import cls from './ArticleListItem.module.scss';

interface ArticleListProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    index?: number;
    setLastIndex?: (index: number) => void;
}

export const ArticleListItem = (props: ArticleListProps) => {
    const { className, article, view, target, index = 0, setLastIndex } = props;
    const { t } = useTranslation('article');

    const types = useMemo(
        () => <Text text={ article.type.join(', ') } className={ cls.types } />,
        [article.type],
    );
    const views = useMemo(
        () => (
            <HStack justify="between" gap="8">
                <Text text={ String(article.views) } className={ cls.views } />
                <Icon Svg={ EyeIcon }
                      width={ 24 }
                      height={ 24 } />
            </HStack>
        ),
        [article.views],
    );

    const textBlock = article.blocks.find(
        (block) => block.type === 'TEXT',
    ) as ArticleTextBlockType;

    const onSetLastIndex = useCallback(() => {
        setLastIndex?.(index);
    }, [index, setLastIndex]);

    return (
        <div
            data-testid="ArticleListItem"
            className={ classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ]) }
        >
            { view === 'LIST' ? (
                <Card className={ cls.cardListWrapper }>
                    <HStack justify="between">
                        <HStack gap="8" className={ cls.userInfo }>
                            <Avatar src={ article.user.avatar } size={ 30 } />
                            <Text text={ article.user.username } />
                        </HStack>
                        <Text
                            text={ new Date(
                                article.createdAt,
                            ).toLocaleDateString() }
                            className={ cls.date }
                        />
                    </HStack>
                    <Text title={ article.title } className={ cls.title } />
                    { types }
                    <AppImage
                        fallback={ <Skeleton width="100%" height={ 250 } /> }
                        src={ article.img }
                        className={ cls.img }
                        alt={ article.title }
                    />
                    { textBlock && <ArticleTextBlock block={ textBlock } /> }
                    <HStack justify="between">
                        <AppLink target={ target } to={ `/articles/${article.id}` }>
                            <Button onClick={ onSetLastIndex }>
                                { t('Read more...') }
                            </Button>
                        </AppLink>
                        { views }
                    </HStack>
                </Card>
            ) : (
                <AppLink target={ target } to={ `/articles/${article.id}` }>
                    <Card onClick={ onSetLastIndex }>
                        <div className={ cls.imageWrapper }>
                            <AppImage
                                fallback={ <Skeleton width={ 200 } height={ 200 } /> }
                                src={ article.img }
                                className={ cls.img }
                                alt={ article.title }
                            />
                            <Text
                                text={ new Date(
                                    article.createdAt,
                                ).toLocaleDateString() }
                                className={ cls.date }
                            />
                        </div>
                        <HStack justify="between">
                            { types }
                            { views }
                        </HStack>
                        <Text text={ article.title } className={ cls.title } />
                    </Card>
                </AppLink>
            ) }
        </div>
    );
};
