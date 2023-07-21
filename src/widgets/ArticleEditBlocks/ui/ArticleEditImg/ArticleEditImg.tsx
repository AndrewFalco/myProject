import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/deprecated';
import ErrorFallbackImg from '@/shared/assets/img/image_placeholder.png';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './ArticleEditImg.module.scss';

interface ArticleEditImgProps {
    className?: string;
    title?: string;
    src?: string;
    alt?: string;
}

export const ArticleEditImg = memo((props: ArticleEditImgProps) => {
    const { className, alt: defAlt = '', src: defSrc = '', title: defTitle = '' } = props;
    const { t } = useTranslation();
    const [src, setSrc] = useState(defSrc);
    const [alt, setAlt] = useState(defAlt);
    const [title, setTitle] = useState(defTitle);

    const onSetSrc = useCallback((value: string) => {
        setSrc(value);
    }, []);

    const onSetAlt = useCallback((value: string) => {
        setAlt(value);
    }, []);

    const onSetTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    return (
        <VStack gap="16" className={ classNames(cls.ArticleEditImg, {}, [className]) }>
            <Input label={ t('Title') || 'Title' }
                   onChange={ onSetTitle }
                   value={ title } />
            <Input label={ t('Image url') || 'Image url' }
                   onChange={ onSetSrc }
                   value={ src } />
            <Input label="alt"
                   onChange={ onSetAlt }
                   value={ alt } />
            <AppImage
                src={ src }
                alt={ alt }
                fallback={ <Skeleton width={ 420 } height={ 380 } /> }
                width={ 420 }
                height={ 380 }
                className={ cls.img }
                errorFallback={ <AppImage alt=""
                                          src={ ErrorFallbackImg }
                                          className={ cls.img } /> }
            />
        </VStack>
    );
});
