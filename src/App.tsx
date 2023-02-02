import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { MainPageLazy } from './pages/Main/MainPage.lazy';
import { AboutPageLazy } from './pages/About/AboutPage.lazy';

import './styles/index.scss';
import { useTheme } from './styles/theme/useTheme';
import { classNames } from './helpers/classTheme/classNames';

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
                    <Route path="/" element={<MainPageLazy />} />
                    <Route path="/about" element={<AboutPageLazy />} />
                </Routes>
            </Suspense>
        </div>
    );
};
