import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockType } from '../../../model/types/article';
import { ArticleListProps } from '../ArticleListItem';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { getRouteArticleDetails } from '@/shared/consts/routes';
import ErrorFallbackImg from '@/shared/assets/img/image_placeholder.png';

export const ArticleListItemRedesigned = (props: ArticleListProps) => {
    const { article, view, className, index = 0, setLastIndex, target } = props;
    const { t } = useTranslation('article');

    const userInfo = (
        <>
            <Avatar size={ 32 } src={ article.user.avatar } />
            <Text bold text={ article.user.username } />
        </>
    );
    const views = useMemo(
        () => (
            <HStack justify="between" gap="8">
                <Icon Svg={ EyeIcon } width={ 24 } height={ 24 } />
                <Text text={ String(article.views) } className={ cls.views } />
            </HStack>
        ),
        [article.views],
    );

    const textBlock = article.blocks.find((block) => block.type === 'TEXT') as ArticleTextBlockType;

    const onSetLastIndex = useCallback(() => {
        setLastIndex?.(index);
    }, [index, setLastIndex]);

    return view === 'LIST' ? (
        <Card data-testid="ArticleListItem"
              padding="24"
              className={ classNames('', {}, [className, cls[view]]) }
              max>
            <VStack max gap="16">
                <HStack justify="start" gap="8">
                    <HStack gap="8" className={ cls.userInfo }>
                        <Avatar src={ article.user.avatar } size={ 30 } />
                        <Text text={ article.user.username } bold />
                    </HStack>
                    <Text text={ new Date(article.createdAt).toLocaleDateString() } />
                </HStack>
                <Text title={ article.title } bold />
                <Text title={ article.subtitle } size="sizeS" bold />
                { article.img && <AppImage
                    fallback={ <Skeleton width="100%" height={ 250 } /> }
                    errorFallback={ undefined }
                    src={ article.img }
                    className={ cls.img }
                    alt={ article.title }
                /> }
                { textBlock && <Text className={ cls.textBlock } text={ textBlock.paragraphs.slice(0, 2).join(' ') } /> }
                <HStack justify="between" max>
                    <AppLink target={ target } to={ `/articles/${article.id}` }>
                        <Button onClick={ onSetLastIndex }>{ t('Read more...') }</Button>
                    </AppLink>
                    { views }
                </HStack>
            </VStack>
        </Card>
    ) : (
        <AppLink
            data-testid="ArticleListItem"
            target={ target }
            to={ getRouteArticleDetails(article.id) }
            className={ classNames(cls.ArticleListItem, {}, [className, cls[view]]) }
        >
            <Card className={ cls.card } border="round">
                { article.img && <AppImage
                    fallback={ <Skeleton width={ 200 } height={ 200 } /> }
                    errorFallback={ <AppImage alt="" src={ ErrorFallbackImg } className={ cls.img } /> }
                    alt={ article.title }
                    src={ article.img }
                    className={ cls.img }
                /> }
                <VStack className={ cls.info } gap="4">
                    <Text title={ article.title } className={ cls.title } />
                    <VStack gap="4" className={ cls.footer } max>
                        <HStack justify="between" max>
                            <Text text={ new Date(article.createdAt).toLocaleDateString() } className={ cls.date } />
                            { views }
                        </HStack>
                        <HStack gap="4">{ userInfo }</HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
};
