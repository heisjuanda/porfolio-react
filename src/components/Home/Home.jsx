import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';

import { TrailerMouse } from '../TrailerMouse/TrailerMouse';

import logo from '../../assets/images/projects/heisjuandaLogo.webp';

import './Home.css';

export const Home = () => {

    const history = useNavigate();

    const animationTransitionRef = useRef();

    const [wasAnimated, setWasAnimated] = useState(false);

    const handleGoToAbout = useCallback(() => {
        if (animationTransitionRef.current) {
            animationTransitionRef.current.style.width = '100vw';
            setWasAnimated(true);
            setTimeout(() => {
                history('/about');
            }, 1000);
        }
    }, [history]);

    return (
        <section className='home-section'>
            <div ref={animationTransitionRef} className='home-about__transition'></div>
            {wasAnimated ? (
                <TrailerMouse opacity={'0'} transition={'0.8'}/>
            ) : (
                <TrailerMouse />
            )}
            <main>
                <header className='home-section__title'>
                    <img src={logo} alt="He is JuanDa logo" />
                    <p id='my-role'>
                        Web Developer <span><i className="fa-solid fa-cubes"></i></span>
                    </p>
                    <p id='current-year'>
                        {new Date(Date.now()).getFullYear()}
                    </p>
                    <div id='go-to__about' className='interactable' data-type='button-click'>
                        <i
                            className="fa-solid fa-arrow-down"
                            onClick={handleGoToAbout}
                        ></i>
                    </div>
                </header>
                <article className='home-section__content'>
                    <div>
                        <h2>
                            Juan David
                        </h2>
                        <h2>
                            Moreno Alfonso
                        </h2>
                    </div>
                </article>
            </main>
        </section>
    );
};