export type ArticleType = 'IT' | 'NATURAL' | 'SCIENCE' | 'GAMES' | 'PHILOSOPHY';

export type ArticleBlockType = 'TEXT' | 'CODE' | 'IMAGE';

export type ArticleBlockBase = {
    id: string,
    type: ArticleBlockType,
    title: string,
};

export type ArticleCodeBlock = ArticleBlockBase & {
    type: 'CODE',
    code: string,
};

export type ArticleImageBlock = ArticleBlockBase & {
    type: 'IMAGE',
    img: string,
};

export type ArticleTextBlock = ArticleBlockBase & {
    type: 'TEXT',
    paragraphs: string[],
};

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
    id: string,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    createdAt: string,
    type: ArticleType[],
    blocks: ArticleBlock[],
}
