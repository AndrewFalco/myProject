import { MutableRefObject, memo, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/component/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { Page } from '@/widgets/Page';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import { getArticlesPageError } from '../../model/selectors/articlesPageSelectors';
import { initArticlesPage } from '../../model/services/initArticlesPage';
import { ArticlePageSort } from './ArticlePageSort';
import { ArticlePageList } from './ArticlePageList';
import { ToggleFeature, toggleFeatures } from '@/shared/lib/features';
import { MainLayoutContext } from '@/shared/layouts/MainLayout';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const error = useSelector(getArticlesPageError);
    const [searchParams] = useSearchParams();
    const parentRefNew = useContext(MainLayoutContext) as MutableRefObject<HTMLDivElement>;
    const parentRefOld = useRef() as MutableRefObject<HTMLDivElement>;

    const parentRef = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => parentRefNew,
        off: () => parentRefOld,
    });

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const content = (
        <ToggleFeature
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    content={
                        <Page error={ (error && t(error || 'Error with loading')) || undefined }>
                            <ArticlePageList parentRef={ parentRef } />
                        </Page>
                    }
                    left={ <ViewSelectorContainer /> }
                    right={ <FiltersContainer /> }
                />
            }
            off={
                <Page parentRef={ parentRef } error={ (error && t(error || 'Error with loading')) || undefined }>
                    <ArticlePageSort />
                    <ArticlePageList parentRef={ parentRef } />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={ reducers } removeAfterUnmount={ false }>
            { content }
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
