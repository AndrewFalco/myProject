import { User } from '@/entities/User';

export type ArticleType = 'ALL' | 'IT' | 'NATURAL' | 'SCIENCE' | 'GAMES' | 'PHILOSOPHY' | 'ECONOMICS';

export type ArticleBlockType = 'TEXT' | 'CODE' | 'IMAGE';

export type ArticleView = 'LIST' | 'GRID';

export type ArticleBlockBase = {
    id: string,
    type: ArticleBlockType,
    title: string,
};

export type ArticleCodeBlockType = ArticleBlockBase & {
    type: 'CODE',
    code: string,
};

export type ArticleImageBlockType = ArticleBlockBase & {
    type: 'IMAGE',
    img: string,
};

export type ArticleTextBlockType = ArticleBlockBase & {
    type: 'TEXT',
    paragraphs: string[],
};

export type ArticleBlock = ArticleCodeBlockType | ArticleImageBlockType | ArticleTextBlockType;

export interface Article {
    id: string,
    user: User,
    title: string,
    subtitle: string,
    img: string,
    views: number,
    createdAt: string,
    type: ArticleType[],
    blocks: ArticleBlock[],
}
