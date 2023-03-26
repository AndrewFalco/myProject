import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';

import cls from './Page.module.scss';

interface PageProps {
    className?: string,
    onScrollEnd?: () => void,
}

export const Page = (props: PropsWithChildren<PageProps>) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    return (
        <section
          ref={ wrapperRef }
          className={ classNames(cls.Page, {}, [className]) }
        >
            { children }
            <div ref={ triggerRef } />
        </section>
    );
};
