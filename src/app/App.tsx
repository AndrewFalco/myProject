import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';

import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { classNames } from 'shared/lib/classNames';

export const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Change theme</button>
            <div style={ { display: 'flex', margin: 10 } }>
                <Link to='/'>Main page</Link>
                <Link to='/about'>About page</Link>
            </div>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};
