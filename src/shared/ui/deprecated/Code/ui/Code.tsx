import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import { Button } from '../../Button';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

/**
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={ classNames(cls.Code, {}, [className]) }>
            <Button className={ cls.btn }
                    theme="clear"
                    onClick={ onCopy }>
                <CopyIcon className={ cls.copyIcon } />
            </Button>
            <code>{ text }</code>
        </pre>
    );
});
