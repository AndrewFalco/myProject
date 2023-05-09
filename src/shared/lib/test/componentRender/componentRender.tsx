import { ReactNode } from 'react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from '@/shared/config/i18n/i18nForTest';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { Theme } from '@/shared/types/theme';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

type WrapperProviderProps = {
    options?: componentRenderOptions;
    children: ReactNode;
}

export const WrapperProvider = (props: WrapperProviderProps) => {
    const { children, options = {} } = props;
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = 'app_light_theme',
    } = options;

    return (
        <MemoryRouter initialEntries={ [route] }>
            <StoreProvider asyncReducers={ asyncReducers } initialState={ initialState }>
                <I18nextProvider i18n={ i18nForTests }>
                    <ThemeProvider initialTheme={ theme }>
                        <div className={ `app ${theme}` }>
                            { children }
                        </div>
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    );
};

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(
        <WrapperProvider options={ options }>
            { component }
        </WrapperProvider>,
    );
}
