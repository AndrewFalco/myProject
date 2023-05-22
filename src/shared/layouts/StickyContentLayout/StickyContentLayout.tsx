import { ReactElement, forwardRef, ForwardedRef } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StickyContentLayout.module.scss';

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = forwardRef(
    (props: StickyContentLayoutProps, ref: ForwardedRef<HTMLDivElement>) => {
        const { className, content, left, right } = props;

        return (
            <div
                className={ classNames(cls.StickyContentLayout, {}, [className]) }
            >
                { right && <div className={ cls.left }>{ left }</div> }
                <div ref={ ref } className={ cls.content }>
                    { content }
                </div>
                { left && <div className={ cls.right }>{ right }</div> }
            </div>
        );
    },
);
