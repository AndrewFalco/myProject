import { Link } from 'react-router-dom';

import './styles/index.scss';
import { useTheme } from './providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames';
import { AppRoute } from './providers/route';

export const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Change theme</button>
            <div style={ { display: 'flex', margin: 10 } }>
                <Link to='/'>Main page</Link>
                <Link to='/about'>About page</Link>
            </div>
            <AppRoute />
        </div>
    );
};
