import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useEffect } from 'react';

import Lottie from 'lottie-react';
import errorAnimation from '../../assets/animations/error404.json';

import './ErrorPage.css';

const ErrorPage = () => {

    const history = useNavigate();

    const transitionContainerRef = useRef();
    const errorSectionRef = useRef();

    const handleGoHome = useCallback(() => {
        if (transitionContainerRef.current) {
            transitionContainerRef.current.style.animation = 'error__transition 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            setTimeout(() => {
                history('/home');
            }, 1050);
        }

    }, [history]);

    useEffect(() => {
        if (errorSectionRef.current) {
            errorSectionRef.current.addEventListener('click',handleGoHome);
        }
    }, [handleGoHome]);

    return (
        <>
            <div ref={transitionContainerRef} className='error-section__transition'></div>
            <section ref={errorSectionRef} className='error-section'>
                <header className='error-section__go-back'>
                    <button onClick={handleGoHome}>
                        Home
                    </button>
                </header>
                <article className='error-section__animation'>
                    <Lottie className='error-page' animationData={errorAnimation} />
                </article>
            </section>
        </>

    );
};

export default ErrorPage;