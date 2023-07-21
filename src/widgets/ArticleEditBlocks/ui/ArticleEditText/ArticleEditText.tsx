import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input, Textarea } from '@/shared/ui/redesigned/Input';

import cls from './ArticleEditText.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleEditTextProps {
    className?: string;
    title?: string;
    paragraphs?: string[];
}

export const ArticleEditText = (props: ArticleEditTextProps) => {
    const { className, title, paragraphs = [] } = props;
    const { t } = useTranslation();
    const [prg, setPrg] = useState(paragraphs.join('\n\n'));

    const onChangePrg = useCallback((value: string) => {
        setPrg(value);
    }, []);

    return (
        <VStack gap="16" className={ classNames(cls.ArticleEditText, {}, [className]) }>
            <Input value={ title } label={ t('Title') || 'Title' } />
            <Textarea value={ prg }
                      label={ t('Text') || 'Text' }
                      onChange={ onChangePrg } />
        </VStack>
    );
};
