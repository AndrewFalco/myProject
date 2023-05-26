import { memo } from 'react';
import { Avatar, Icon, Text } from '@/shared/ui/deprecated';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Article } from '../../model/types/article';
import cls from './ArticleDetails.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderArticleBlock';

interface ArticleDetailsContentProps {
    data: Article;
}

export const ArticleDetailsContent = memo((props: ArticleDetailsContentProps) => {
    const { data } = props;

    return (
        <VStack max
                grow
                gap="8"
                className={ cls.wrapper }>
            <HStack max grow justify="center">
                <Avatar size={ 200 } src={ data.img } />
            </HStack>
            <Text className={ cls.title }
                  title={ data.title }
                  text={ data.subtitle }
                  size="size_l" />
            <HStack gap="8"
                    data-testid="ArticleDetails.Info"
                    align="center"
                    justify="center">
                <Icon Svg={ EyeIcon }
                      className={ cls.icon }
                      width={ 24 }
                      height={ 24 } />
                <Text text={ String(data.views) } />
            </HStack>
            <HStack gap="8" align="center" justify="center">
                <Icon Svg={ CalendarIcon }
                      className={ cls.icon }
                      width={ 24 }
                      height={ 24 } />
                <Text text={ new Date(data.createdAt).toLocaleDateString() } />
            </HStack>
            { data.blocks.map(renderArticleBlock) }
        </VStack>
    );
});
