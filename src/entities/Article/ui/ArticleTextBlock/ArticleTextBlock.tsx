import { memo } from 'react';
import { Text, VStack } from 'shared/ui';
import { ArticleTextBlockType } from '../../model/types/article';
import cls from './ArticleTextBlock.module.scss';

interface ArticleTextBlockProps {
    block: ArticleTextBlockType,
}

export const ArticleTextBlock = memo((props: ArticleTextBlockProps) => {
    const { block } = props;

    return (
        <VStack max gap="8">
            {
                block.title && (
                    <Text
                      title={ block.title }
                      className={ cls.title }
                    />
                )
            }
            {
              block.paragraphs.map((paragraph) => (
                  <Text key={ paragraph } text={ paragraph } className={ cls.paragraph } />
              ))
            }
        </VStack>
    );
});
