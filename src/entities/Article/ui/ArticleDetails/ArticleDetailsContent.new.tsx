import { memo } from 'react';
import { Article } from '../../model/types/article';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { renderArticleBlock } from './renderArticleBlock';
import { Text } from '@/shared/ui/redesigned/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './ArticleDetails.module.scss';

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
            <Text title={ data.title } size="sizeL" bold />
            <Text title={ data.subtitle } />
            <HStack grow
                    max
                    align="center"
                    justify="center">
                <AppImage
                    className={ cls.img }
                    fallback={ <Skeleton className={ cls.img }
                                         width="100%"
                                         height={ 420 }
                                         borderRadius="16px" /> }
                    src={ data.img }
                />
            </HStack>
            { data.blocks.map(renderArticleBlock) }
        </VStack>
    );
});
