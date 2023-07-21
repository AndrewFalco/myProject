import { useCallback } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Article, ArticleBlock } from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { ArticleEditImg, ArticleEditText, ArticleEditCode, ArticleEditType } from '@/widgets/ArticleEditBlocks';
import { Card } from '@/shared/ui/redesigned/Card';
import { ItemControlBlock } from '@/features/ItemControlBlock';
import { Button } from '@/shared/ui/redesigned/Button';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './ArticleEditPage.module.scss';
// import { ArticleEditPageSchema } from './ArticleEditPage.schema';

export interface ArticleEditPageProps {
    data?: Article;
}

export const ArticleEditPageRedesigned = (props: ArticleEditPageProps) => {
    const { data } = props;
    const defaultValues = data
        ? {
              title: data.title,
              subtitle: data.subtitle,
              img: data.img,
              type: data.type.join(', '),
              blocks: data.blocks,
          }
        : undefined;

    const { t } = useTranslation();
    const { handleSubmit, control } = useForm<ArticleEditType>({
        mode: 'all',
        defaultValues,
        // resolver: yupResolver(ArticleEditPageSchema),
    });

    const { fields, append, swap, remove } = useFieldArray({ control, name: 'blocks' });

    const getEditedCard = useCallback((field: ArticleBlock) => {
        switch (field.type) {
            case 'CODE':
                return (
                    <Card max className={ cls.cardCode }>
                        { /* <ArticleEditCode text={ field.code } control={ control } /> */ }
                        <ArticleEditCode text={ field.code } />
                    </Card>
                );
            case 'IMAGE':
                return (
                    <Card max className={ cls.cardImg }>
                        <ArticleEditImg alt={ field.title }
                                        src={ field.img }
                                        title={ field.title } />
                    </Card>
                );
            case 'TEXT':
                return (
                    <Card max className={ cls.cardText }>
                        <ArticleEditText paragraphs={ field.paragraphs } title={ field.title } />
                    </Card>
                );
            default:
                return null;
        }
    }, []);

    const addBlock = useCallback((type: string) => () => append({ type } as ArticleBlock), [append]);

    const onSubmit = (formData: ArticleEditType) => {
        // console.log(formData);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className={ cls.formCls }>
            <HStack align="start"
                    justify="start"
                    gap="24">
                <VStack gap="24"
                        max
                        grow
                        align="center">
                    <Controller
                        name="title"
                        render={ ({ field }) => <Input label={ t('Title') || '' } { ...field } /> }
                        control={ control }
                    />
                    <Controller
                        name="subtitle"
                        render={ ({ field }) => <Input label={ t('Subtitle') || '' } { ...field } /> }
                        control={ control }
                    />
                    <Controller
                        name="img"
                        render={ ({ field: { value, onChange } }) => (
                            <>
                                <Input label={ t('Image') || '' }
                                       value={ value }
                                       onChange={ onChange } />
                                <AppImage
                                    src={ value }
                                    width={ 420 }
                                    height={ 380 }
                                    fallback={ <Skeleton width={ 420 } height={ 380 } /> }
                                    errorFallback={ <Skeleton width={ 420 } height={ 380 } /> }
                                />
                            </>
                        ) }
                        control={ control }
                    />
                    <Controller
                        name="type"
                        render={ ({ field }) => <Input label={ t('Type') || '' } { ...field } /> }
                        control={ control }
                    />
                    <div className={ cls.blocksList }>
                        { fields.map((field, i) => (
                            <div key={ `${field.id}_wrapper` } className={ cls.gridFormat }>
                                { getEditedCard(field) }
                                <ItemControlBlock
                                    currentIndex={ i }
                                    length={ fields.length }
                                    onDelete={ () => remove(i) }
                                    onSwapDown={ () => swap(i, i + 1) }
                                    onSwapUp={ () => swap(i, i - 1) }
                                />
                            </div>
                        )) }
                    </div>

                    <div className={ cls.addControls }>
                        { ['CODE', 'IMAGE', 'TEXT'].map((el: string) => (
                            <Card max
                                  className={ cls.cardController }
                                  onClick={ addBlock(el) }
                                  key={ el }>
                                { `Add ${el.toLowerCase()}` }
                            </Card>
                        )) }
                    </div>
                </VStack>
                <VStack className={ cls.btnGroup }
                        gap="16"
                        align="center"
                        justify="center">
                    <Button type="submit"
                            fullWidth
                            colorButton="success">
                        { t('Save') }
                    </Button>
                    <Button fullWidth colorButton="error">
                        { t('Cancel') }
                    </Button>
                </VStack>
            </HStack>
        </form>
    );
};
