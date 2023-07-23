import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useEffect, useState } from 'react';

import Lottie from 'lottie-react';
import errorAnimation from '../../assets/animations/error404.json';
import { gsap } from 'gsap';

import './ErrorPage.css';

const ErrorPage = () => {

    const history = useNavigate();

    const transitionContainerRef = useRef();
    const svgRef = useRef();
    const errorSectionRef = useRef();

    const [wasClicked, setWasClicked] = useState(false);

    const handleGoHome = useCallback(() => {
        const tl = gsap.timeline();
        if (transitionContainerRef.current && svgRef.current && errorSectionRef.current) {
            setWasClicked(true);
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
            errorSectionRef.current.style.opacity = '0';
            tl.to(svgRef.current, {
                duration: 0.8,
                attr: { d: curve },
                animationFillMode: 'forwards',
                ease: "power3.in",
            }).to(svgRef.current, {
                duration: 0.8,
                animationFillMode: 'forwards',
                attr: { d: flat },
                ease: "power3.out",
            });
            setTimeout(() => {
                history('/home');
            }, 1610);
        }
        setWasClicked(true);
    }, [history]);

    useEffect(() => {
        if (errorSectionRef.current) {
            !wasClicked ? 
                errorSectionRef.current.addEventListener('click',handleGoHome) :
                errorSectionRef.current.removeEventListener('click',handleGoHome);
        }
    }, [handleGoHome, wasClicked]);

    return (
        <>
            <div ref={transitionContainerRef} className="loader-wrap__errorP">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
                </svg>
            </div>
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