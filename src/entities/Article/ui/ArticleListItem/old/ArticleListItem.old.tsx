import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { ArticleTextBlock } from '../../ArticleTextBlock/ArticleTextBlock';
import { Card, Avatar, AppImage, Skeleton, AppLink, Button, Icon, Text } from '@/shared/ui/deprecated';
import cls from '../ArticleListItem.module.scss';
import { ArticleTextBlockType } from '../../../model/types/article';
import { ArticleListProps } from '../ArticleListItem';
import { HStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemDeprecated = (props: ArticleListProps) => {
    const { article, view, className, index = 0, setLastIndex, target } = props;
    const { t } = useTranslation('article');

    const types = useMemo(() => <Text text={ article.type.join(', ') } className={ cls.types } />, [article.type]);
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

    const textBlock = article.blocks.find((block) => block.type === 'TEXT') as ArticleTextBlockType;

    const onSetLastIndex = useCallback(() => {
        setLastIndex?.(index);
    }, [index, setLastIndex]);

    return (
        <div data-testid="ArticleListItem" className={ classNames(cls.ArticleListItem, {}, [className, cls[view]]) }>
            { view === 'LIST' ? (
                <Card className={ cls.cardListWrapper }>
                    <HStack justify="between">
                        <HStack gap="8" className={ cls.userInfo }>
                            <Avatar src={ article.user.avatar } size={ 30 } />
                            <Text text={ article.user.username } />
                        </HStack>
                        <Text text={ new Date(article.createdAt).toLocaleDateString() } className={ cls.date } />
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
                            <Button onClick={ onSetLastIndex }>{ t('Read more...') }</Button>
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
                            <Text text={ new Date(article.createdAt).toLocaleDateString() } className={ cls.date } />
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
