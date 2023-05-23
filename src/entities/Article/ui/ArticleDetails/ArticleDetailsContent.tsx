import { memo, useCallback } from 'react';
import { Avatar, HStack, Icon, Text } from '@/shared/ui/deprecated';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Article, ArticleBlock } from '../../model/types/article';
import cls from './ArticleDetails.module.scss';
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock';

interface ArticleDetailsContentProps {
    data: Article;
}

export const ArticleDetailsContent = memo(
    (props: ArticleDetailsContentProps) => {
        const { data } = props;

        const renderBlock = useCallback((block: ArticleBlock) => {
            switch (block.type) {
                case 'CODE':
                    return <ArticleCodeBlock key={ block.id } block={ block } />;
                case 'IMAGE':
                    return <ArticleImageBlock key={ block.id } block={ block } />;
                case 'TEXT':
                    return <ArticleTextBlock key={ block.id } block={ block } />;
                default:
                    return null;
            }
        }, []);

        return (
            <>
                <HStack max grow justify="center">
                    <Avatar size={ 200 } src={ data.img } className={ cls.avatar } />
                </HStack>
                <Text
                    className={ cls.title }
                    title={ data.title }
                    text={ data.subtitle }
                    size="size_l"
                />
                <HStack
                    gap="8"
                    data-testid="ArticleDetails.Info"
                    align="center"
                    justify="center"
                >
                    <Icon
                        Svg={ EyeIcon }
                        className={ cls.icon }
                        width={ 24 }
                        height={ 24 }
                    />
                    <Text text={ String(data.views) } />
                </HStack>
                <HStack gap="8" align="center" justify="center">
                    <Icon
                        Svg={ CalendarIcon }
                        className={ cls.icon }
                        width={ 24 }
                        height={ 24 }
                    />
                    <Text
                        text={ new Date(data.createdAt).toLocaleDateString() }
                    />
                </HStack>
                { data.blocks.map(renderBlock) }
            </>
        );
    },
);
