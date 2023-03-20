import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui';
import { ArticleImageBlock as ArticleImageBlockType } from '../../model/types/article';
import cls from './ArticleImageBlock.module.scss';

interface ArticleImageBlockProps {
    className?: string,
    block: ArticleImageBlockType,
}

export const ArticleImageBlock = memo((props: ArticleImageBlockProps) => {
    const { className, block } = props;

    return (
        <div className={ classNames(cls.ArticleImageBlock, {}, [className]) }>
            <img src={ block.img } alt={ block.title } className={ cls.img } />
            { block.title && <Text text={ block.title } align="center" /> }
        </div>
    );
});
