import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleTextBlockType } from '../../model/types/article';
import cls from './ArticleTextBlock.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleTextBlockProps {
    block: ArticleTextBlockType;
}

export const ArticleTextBlock = memo((props: ArticleTextBlockProps) => {
    const { block } = props;

    return (
        <VStack max gap="8">
            { block.title && (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <Text title={ block.title } className={ cls.title } /> }
                    off={ <TextDeprecated title={ block.title } className={ cls.title } /> }
                />
            ) }
            { block.paragraphs.map((paragraph) => (
                <ToggleFeature
                    key={ paragraph }
                    feature="isAppRedesigned"
                    on={ <Text key={ paragraph }
                               text={ paragraph }
                               className={ cls.paragraph } /> }
                    off={ <TextDeprecated key={ paragraph }
                                          text={ paragraph }
                                          className={ cls.paragraph } /> }
                />
            )) }
        </VStack>
    );
});
