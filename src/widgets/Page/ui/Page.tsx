import {
 MutableRefObject, PropsWithChildren, UIEvent,
} from 'react';
import { useLocation } from 'react-router-dom';
import { scrollSaveActions } from '@/features/ScrollSave';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { TestProps } from '@/shared/types/testTypes';

import cls from './Page.module.scss';

interface PageProps extends TestProps{
    className?: string,
    parentRef?: MutableRefObject<HTMLDivElement>,
    error?: string | null,
}

export const PAGE_ID = 'page-id';

export const Page = (props: PropsWithChildren<PageProps>) => {
    const {
        className, children, parentRef, error, 'data-testid': dataTestId,
    } = props;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollSaveActions.setScrollPosition({ path: pathname, position: e.currentTarget.scrollTop }));
    }, 500);

    return (
        <section
          data-testid={ dataTestId || PAGE_ID }
          ref={ parentRef }
          className={ classNames(cls.Page, {}, [className]) }
          onScroll={ onScroll }
        >
            {
                !error
                    ? children
                    : <Text title={ error } theme="error" />
            }
        </section>
    );
};
