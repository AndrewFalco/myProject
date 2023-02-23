import { ThemeProvider } from 'app/providers/ThemeProvider';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { PageError } from 'widgets/PageError/ui/PageError';
import { App } from './app/App';
import 'app/styles/index.scss';
import 'shared/config/i18n/i18n';

render(
    <BrowserRouter>
        <ErrorBoundary
            FallbackComponent={ PageError }
        >
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>,
    document.getElementById('root'),
);
