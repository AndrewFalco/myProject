import { memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleCodeBlockType } from '../../model/types/article';
import { Code } from '@/shared/ui/redesigned/Code';

interface ArticleCodeBlockProps {
    block: ArticleCodeBlockType;
}

export const ArticleCodeBlock = memo((props: ArticleCodeBlockProps) => {
    const { block } = props;

    return (
        <HStack max justify="center">
            <Code text={ block.code } />
        </HStack>
    );
});
