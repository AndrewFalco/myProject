import { scrollSaveActions } from 'features/ScrollSave';
import {
 MutableRefObject, PropsWithChildren, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useThrottle } from 'shared/lib/hooks/useThrottle';

import cls from './Page.module.scss';

interface PageProps {
    className?: string,
    parentRef?: MutableRefObject<HTMLDivElement>,
}

export const Page = (props: PropsWithChildren<PageProps>) => {
    const {
        className, children, parentRef,
    } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

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
        </section>
    );
};
