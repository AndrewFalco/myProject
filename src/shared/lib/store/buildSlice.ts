import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
    CreateSliceOptions,
    bindActionCreators,
    createSlice,
} from '@reduxjs/toolkit';
import { SliceCaseReducers } from '@reduxjs/toolkit/dist';

// TODO: Переписать все на новые хуки

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch();

        // @ts-ignore
        return useMemo(
            // @ts-ignore
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        );
    };

    return {
        useActions,
        ...slice,
    };
}
