import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Menu } from '../components/Menu/Menu';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';
import { Intro } from '../components/Intro/Intro';
import { Home } from '../components/Home/Home';
import { About } from '../components/About/About';
import { Work } from '../components/Work/Work';
import { ProjectPage } from '../components/Work/components/ProjectPage/ProjectPage';
import { Talk } from '../components/Talk/Talk';

//import { PrivateRouter } from './PrivateRouter/PrivateRouter';
//<Route element={<PrivateRouter isAuth={false} />}></Route>
export const RoutesConfiguration = () => {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path='*' element={<ErrorPage />} />
                <Route path='/' element={<Intro />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/work' element={<Work />} />
                <Route path='/work/project/:id' element={<ProjectPage />} />
                <Route path='/contact' element={<Talk />} />
            </Routes>
        </Router>
    );
};
