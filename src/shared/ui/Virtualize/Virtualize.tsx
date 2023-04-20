import {
    MutableRefObject, ReactNode, useCallback, useEffect, useRef,
} from 'react';
import {
 Virtuoso, VirtuosoGrid, VirtuosoHandle,
} from 'react-virtuoso';
import { classNames } from 'shared/lib/classNames/classNames';
import { ViewType } from '../../types';

import cls from './Virtualize.module.scss';

interface VirtualizeProps<T> {
    data: T[];
    className?: string;
    view?: ViewType;
    isLoading?: boolean;
    lastIndex?: number;
    renderNode: (index: number, item: T) => ReactNode;
    onScrollEnd?: () => void;
    renderSkeleton?: (index: number) => ReactNode;
    parentRef?: MutableRefObject<HTMLDivElement>;
}

export const Virtualize = <T, >(props: VirtualizeProps<T>) => {
    const {
        className, data, renderNode, view = 'LIST', onScrollEnd, renderSkeleton, isLoading = false,
        parentRef, lastIndex = 0,
    } = props;

    const ref = useRef<VirtuosoHandle>(null);

    const timeoutScroll = useCallback(() => setTimeout(() => {
            ref.current?.scrollToIndex({ index: lastIndex, align: 'center', behavior: 'auto' });
        }, 100), [lastIndex]);

    useEffect(() => {
        timeoutScroll();

        return () => {
            clearTimeout(timeoutScroll());
        };
    }, [timeoutScroll]);

    return (
        view === 'LIST'
            ? (
                <Virtuoso
                  className={ classNames(cls.Virtualize, {}, [className]) }
                  data={ data }
                  itemContent={ (index, item) => (isLoading ? renderSkeleton?.(index) : renderNode(index, item)) }
                  endReached={ onScrollEnd }
                  initialTopMostItemIndex={ lastIndex }
                  customScrollParent={ parentRef?.current }
                  useWindowScroll
                />
            )
            : (
                <VirtuosoGrid
                  className={ classNames(cls.Virtualize, {}, [className]) }
                  ref={ ref }
                  data={ data }
                  itemContent={ (index, item) => (isLoading ? renderSkeleton?.(index) : renderNode(index, item)) }
                  endReached={ onScrollEnd }
                  listClassName={ cls.gridView }
                  customScrollParent={ parentRef?.current }
                  useWindowScroll
                />
            )
    );
};
