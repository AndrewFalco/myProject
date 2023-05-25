import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlock } from '../ArticleCodeBlock/ArticleCodeBlock';
import { ArticleImageBlock } from '../ArticleImageBlock/ArticleImageBlock';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';

export const renderArticleBlock = (block: ArticleBlock) => {
    switch (block.type) {
        case 'CODE':
            return <ArticleCodeBlock key={ block.id } block={ block } />;
        case 'IMAGE':
            return <ArticleImageBlock key={ block.id } block={ block } />;
        case 'TEXT':
            return <ArticleTextBlock key={ block.id } block={ block } />;
        default:
            return null;
    }
};
