import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { Button as ButtonDeprecated } from '../../../deprecated/Button';
import { ToggleFeature } from '@/shared/lib/features';
import { Icon } from '../../Icon';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
    isEditable?: boolean;
}

export const Code = memo((props: CodeProps) => {
    const { className, text, isEditable = false } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <pre className={ classNames(cls.CodeRedesigned, {}, [className]) }>
                    <Icon Svg={ CopyIconNew }
                          onClick={ onCopy }
                          className={ cls.btn }
                          hovered
                          clickable />
                    <code contentEditable={ isEditable }>{ text }</code>
                </pre>
            }
            off={
                <pre className={ classNames(cls.Code, {}, [className]) }>
                    <ButtonDeprecated className={ cls.btn }
                                      theme="clear"
                                      onClick={ onCopy }>
                        <CopyIcon className={ cls.copyIcon } />
                    </ButtonDeprecated>
                    <code contentEditable={ isEditable }>{ text }</code>
                </pre>
            }
        />
    );
});
