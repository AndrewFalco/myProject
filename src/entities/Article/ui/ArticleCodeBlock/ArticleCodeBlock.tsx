import { memo } from 'react';
import { Code, HStack } from 'shared/ui';
import { ArticleCodeBlockType } from '../../model/types/article';

interface ArticleCodeBlockProps {
    block: ArticleCodeBlockType,
}

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
    const { block } = props;

    return (
        <HStack max justify="center">
            <Code text={ block.code } />
        </HStack>
    );
});
