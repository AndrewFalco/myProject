import { Reducer } from '@reduxjs/toolkit';
import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { StateSchema, StateSchemaKey, ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { ToggleFeature } from '../../features';
import { classNames } from '../../classNames/classNames';

import cls from './DynamicModuleLoader.module.scss';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
    className?: string;
}

export const DynamicModuleLoader = (props: PropsWithChildren<DynamicModuleLoaderProps>) => {
    const { children, reducers, removeAfterUnmount = true, className } = props;
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

    return (
        <ToggleFeature
            feature="isAppRedesigned"
            on={ <div className={ classNames(cls.wrapperRedesigned, {}, [className]) }>{ children }</div> }
            off={ <div className={ cls.wrapper }>{ children }</div> }
        />
    );
};
