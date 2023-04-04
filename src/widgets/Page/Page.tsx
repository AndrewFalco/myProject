import { StateSchema } from 'app/providers/StoreProvider';
import { scrollSaveActions, getScrollSavePositionByPath } from 'features/ScrollSave';
import {
 MutableRefObject, PropsWithChildren, useRef, UIEvent,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useThrottle } from 'shared/lib/hooks/useThrottle';

import cls from './Page.module.scss';

interface PageProps {
    className?: string,
    onScrollEnd?: () => void,
}

export const Page = (props: PropsWithChildren<PageProps>) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollSavePositionByPath(state, pathname));

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef,
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
    }, 500);

    return (
        <section
          ref={ wrapperRef }
          className={ classNames(cls.Page, {}, [className]) }
          onScroll={ onScroll }
        >
            { children }
            { onScrollEnd ? <div className={ cls.trigger } ref={ triggerRef } /> : null }
        </section>
    );
};
