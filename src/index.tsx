import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { PageError } from '@/widgets/PageError';
import { App } from './app/App';
import { ThemeProvider } from './shared/lib/providers/ThemeProvider';
import '@/app/styles/index.scss';
import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root element not found');
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary FallbackComponent={ PageError }>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
