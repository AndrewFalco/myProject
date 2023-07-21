// import { Control, Controller } from 'react-hook-form';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Code } from '@/shared/ui/redesigned/Code';

import cls from './ArticleEditCode.module.scss';
// import { ArticleEditType } from '../../model/types/articleEditTypes';

interface ArticleEditCodeProps {
    className?: string;
    text?: string;
    // control: Control<ArticleEditType>;
}

export const ArticleEditCode = (props: ArticleEditCodeProps) => {
    // const { className, text = '', control } = props;
    const { className, text = '' } = props;

    return (
        // <Controller
        //     control={ control }
        //     key={ key }
        //     render={ ({ field: { value, onChange } }) => (
        //         <VStack className={ classNames(cls.ArticleEditCode, {}, [className]) }>
        //             <Code text={ text }
        //                   isEditable
        //                   className={ cls.codeBlock } />
        //         </VStack>
        //     ) }
        // />
        <VStack className={ classNames(cls.ArticleEditCode, {}, [className]) }>
            <Code text={ text }
                  isEditable
                  className={ cls.codeBlock } />
        </VStack>
    );
};
