import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState, useEffect } from 'react';

import { TrailerMouse } from '../TrailerMouse/TrailerMouse';

import getLetters from '../../helpers/getLetters';
import { gsap } from 'gsap';

import logo from '../../assets/images/projects/heisjuandaLogo.webp';
import cube from '../../assets/images/icons/cubeW.png';
import arrowDonw from '../../assets/images/icons/arrowDownW.png';

import './Home.css';

export const Home = () => {

    const history = useNavigate();

    const animationTransitionRef = useRef();
    const homeNameRef = useRef();
    const svgRef = useRef();

    const [wasAnimated, setWasAnimated] = useState(false);

    const handleGoToAbout = useCallback(() => {
        const tl = gsap.timeline();
        if (svgRef.current && animationTransitionRef.current) {
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
            tl.to(svgRef.current, {
                duration: 0.8,
                attr: { d: curve },
                ease: "power3.in",
            }).to(svgRef.current, {
                duration: 0.8,
                attr: { d: flat },
                ease: "power3.out",
            });
            setWasAnimated(true);
            setTimeout(() => {
                history('/about');
            }, 1610);
        }
    }, [history]);

    useEffect(() => {
        homeNameRef.current = Array.from(document.querySelectorAll('.home-name__target'));
        if (homeNameRef.current.length > 0) {
            for (const h2Element of homeNameRef.current) {
                getLetters(h2Element, 'name-letters__home');
            }
        }
    }, []);

    return (
        <section className='home-section'>
            <div ref={animationTransitionRef} className="loader-wrap">
                <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <path ref={svgRef} d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
                </svg>
            </div>
            {wasAnimated ? (
                <TrailerMouse opacity={'0'} transition={'0.8'} />
            ) : (
                <TrailerMouse />
            )}
            <main>
                <header className='home-section__title'>
                    <img src={logo} alt="He is JuanDa logo" />
                    <p id='my-role'>
                        Web Developer <span><img src={cube} alt="minimal cube" /></span>
                    </p>
                    <p id='current-year'>
                        {new Date(Date.now()).getFullYear()}
                    </p>
                    <div id='go-to__about' className='interactable' data-type='button-click'>
                        <img src={arrowDonw} alt="" onClick={handleGoToAbout} />
                    </div>
                </header>
                <article className='home-section__content'>
                    <div>
                        <h2 className='home-name__target'>
                            JUAN DAVID
                        </h2>
                        <h2 className='home-name__target'>
                            MORENO ALFONSO
                        </h2>
                    </div>
                </article>
            </main>
        </section>
    );
};