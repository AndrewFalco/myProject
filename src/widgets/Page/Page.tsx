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
    parentRef?: MutableRefObject<HTMLDivElement>,
}

export const Page = (props: PropsWithChildren<PageProps>) => {
    const {
        className, children, onScrollEnd, parentRef,
    } = props;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollSavePositionByPath(state, pathname));

    // useInfiniteScroll({
    //     callback: onScrollEnd,
    //     triggerRef,
    //     wrapperRef: parentRef,
    // });

    useInitialEffect(() => {
        if (parentRef) {
            parentRef.current.scrollTo({ top: scrollPosition });
        }
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
    }, 500);

    return (
        <section
          ref={ parentRef }
          className={ classNames(cls.Page, {}, [className]) }
          onScroll={ onScroll }
        >
            { children }
            { /* { onScrollEnd ? <div className={ cls.trigger } ref={ triggerRef } /> : null } */ }
        </section>
    );
};
