import { memo } from 'react';
import { Text as TextDeprecated } from '@/shared/ui/deprecated';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleImageBlockType } from '../../model/types/article';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './ArticleImageBlock.module.scss';
import { ToggleFeature } from '@/shared/lib/features';

interface ArticleImageBlockProps {
    block: ArticleImageBlockType;
}

export const ArticleImageBlock = memo((props: ArticleImageBlockProps) => {
    const { block } = props;

    return (
        <HStack max justify="center">
            <img src={ block.img } alt={ block.title } className={ cls.img } />
            { block.title && (
                <ToggleFeature
                    feature="isAppRedesigned"
                    on={ <Text key={ block.title } text={ block.title } align="center" /> }
                    off={ <TextDeprecated key={ block.title } text={ block.title } align="center" /> }
                />
            ) }
        </HStack>
    );
});
