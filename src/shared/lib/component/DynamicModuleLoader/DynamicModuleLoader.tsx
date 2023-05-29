import { Reducer } from '@reduxjs/toolkit';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { StateSchema, StateSchemaKey, ReduxStoreWithManager } from '@/app/providers/StoreProvider';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: PropsWithChildren<DynamicModuleLoaderProps>) => {
    const { children, reducers, removeAfterUnmount = true } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];

            if (!mounted) {
                dispatch({ type: `@INIT ${name}` });
                store.reducerManager.add(name as StateSchemaKey, reducer);
            }
        });

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    dispatch({ type: `@DESTROY ${name}` });
                    store.reducerManager.remove(name as StateSchemaKey);
                });
            }
        };
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{ children }</>;
};
