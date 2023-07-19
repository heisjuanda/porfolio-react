import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import { Loader } from '../components/Loader/Loader';
import { Menu } from '../components/Menu/Menu';
import { Intro } from '../components/Intro/Intro';
import { Home } from '../components/Home/Home';

const ErrorPage = lazy(() => import("../components/ErrorPage/ErrorPage"));
const About = lazy(() => import("../components/About/About"));
const Work = lazy(() => import("../components/Work/Work"));
const ProjectPage = lazy(() => import("../components/ProjectPage/ProjectPage"));
const Talk = lazy(() => import("../components/Talk/Talk"));

export const RoutesConfiguration = () => {
    return (
        <Router>
            <Menu />
            <Routes>
                <Route path='*' element={
                    <Suspense fallback={<Loader color={'white'} />}>
                        <ErrorPage />
                    </Suspense>
                } />
                <Route path='/' element={<Intro />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={
                    <Suspense fallback={<Loader color={'white'} />}>
                        <About />
                    </Suspense>
                } />
                <Route path='/work' element={
                    <Suspense fallback={<Loader color={'white'} />}>
                        <Work />
                    </Suspense>
                } />
                <Route path='/work/project/:id' element={
                    <Suspense fallback={<Loader color={'rgb(15,15,15)'} />}>
                        <ProjectPage />
                    </Suspense>
                } />
                <Route path='/contact' element={
                    <Suspense fallback={<Loader color={'white'} />}>
                        <Talk />
                    </Suspense>
                } />
            </Routes>
        </Router>
    );
};
