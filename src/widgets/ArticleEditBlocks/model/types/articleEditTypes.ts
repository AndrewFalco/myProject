import { Article } from "@/entities/Article";

export type ArticleEditType = Omit<Article, 'id' | 'createdAt' | 'user' | 'views' | 'type'> & { type: string };
