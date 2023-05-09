import { memo } from 'react';
import { HStack, Text } from '@/shared/ui';
import { ArticleImageBlockType } from '../../model/types/article';
import cls from './ArticleImageBlock.module.scss';

interface ArticleImageBlockProps {
    block: ArticleImageBlockType;
}

export const ArticleImageBlock = memo((props: ArticleImageBlockProps) => {
    const { block } = props;

    return (
        <HStack max justify="center">
            <img src={ block.img } alt={ block.title } className={ cls.img } />
            { block.title && <Text text={ block.title } align="center" /> }
        </HStack>
    );
});
