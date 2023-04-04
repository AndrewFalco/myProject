import { ReactNode } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { ViewType } from '../../types';

import cls from './Virtualize.module.scss';

interface VirtualizeProps<T> {
    data: T[];
    className?: string;
    view?: ViewType;
    isLoading?: boolean;
    renderNode: (index: number, item: T) => ReactNode;
    onScrollEnd?: () => void;
    renderSkeleton?: (index: number) => ReactNode;
}

export const Virtualize = <T, >(props: VirtualizeProps<T>) => {
    const {
        className, data, renderNode, view = 'LIST', onScrollEnd, renderSkeleton, isLoading = false,
    } = props;

    return (
        view === 'LIST'
            ? (
                <Virtuoso
                  className={ cls.Virtualize }
                  data={ data }
                  itemContent={ (index, item) => (isLoading ? renderSkeleton?.(index) : renderNode(index, item)) }
                  endReached={ onScrollEnd }
                  useWindowScroll
                />
            )
            : (
                <VirtuosoGrid
                  className={ cls.Virtualize }
                  data={ data }
                  itemContent={ (index, item) => (isLoading ? renderSkeleton?.(index) : renderNode(index, item)) }
                  endReached={ onScrollEnd }
                  listClassName={ cls.gridView }
                  useWindowScroll
                />
            )
    );
};
