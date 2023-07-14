import { useNavigate } from 'react-router-dom';
import { useCallback, useRef } from 'react';

import Lottie from 'lottie-react';
import notFound from '../../assets/animations/404Page.json';

import './ErrorPage.css';

export const ErrorPage = () => {

    const history = useNavigate();

    const transitionContainerRef = useRef();

    const handleGoHome = useCallback(() => {
        if (transitionContainerRef.current) {
            transitionContainerRef.current.style.width = '100vw';
            setTimeout(() => {
                history('/home');
            }, 1002);
        }

    }, [history]);

    return (
        <>
            <div ref={transitionContainerRef} className='error-section__transition'></div>
            <section className='error-section'>
                <header className='error-section__go-back'>
                    <button onClick={handleGoHome}>
                        Home
                    </button>
                </header>
                <article className='error-section__animation'>
                    <Lottie className='error-page' animationData={notFound} />
                </article>
            </section>
        </>

    );
};