import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui';
import { ArticleTextBlock as ArticleTextBlockType } from '../../model/types/article';
import cls from './ArticleTextBlock.module.scss';

interface ArticleTextBlockProps {
    className?: string,
    block: ArticleTextBlockType,
}

export const ArticleTextBlock = memo((props: ArticleTextBlockProps) => {
    const { className, block } = props;

    return (
        <div className={ classNames(cls.ArticleTextBlock, {}, [className]) }>
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
        </div>
    );
});
