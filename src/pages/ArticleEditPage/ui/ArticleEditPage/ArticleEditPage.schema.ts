import * as yup from 'yup';
import { ArticleBlock, ArticleBlockType } from '@/entities/Article';

export const ArticleEditPageSchema = yup.object({
    title: yup.string().required('Required'),
    subtitle: yup.string(),
    img: yup.string(),
    type: yup.string(),
    blocks: yup.array<ArticleBlock[]>().of(
        yup.object({
            type: yup.string(),
            title: yup.string().when('type', {
                is: (value: ArticleBlockType) => value === 'IMAGE' || value === 'TEXT',
                then: (schema) => schema.required(),
            }),
            code: yup.string().when('type', {
                is: (value: ArticleBlockType) => value === 'CODE',
                then: (schema) => schema.required(),
            }),
            src: yup.string().when('type', {
                is: (value: ArticleBlockType) => value === 'IMAGE',
                then: (schema) => schema.required(),
            }),
            paragraphs: yup.array().when('type', {
                is: (value: ArticleBlockType) => value === 'TEXT',
                then: (schema) => schema.required(),
            }),
        }),
    ),
});
