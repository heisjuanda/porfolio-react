import { useEffect, useRef } from 'react';

import getLetters from '../../helpers/getLetters';
import LocomotiveScroll from 'locomotive-scroll';
import SplitType from 'split-type';
import { debounce } from 'lodash';

import Logo from '../../assets/images/projects/Logo.webp';

import './About.css';

export const About = () => {

    const aboutMeRef = useRef();
    const myNameRef = useRef();
    const myDescriptionRef = useRef([]);
    const descriptionLinesRef = useRef([]);

    useEffect(() => {
        let scroll = null;

        const createScroll = () => {
            //locomotive
            scroll = new LocomotiveScroll({
                el: document.querySelector('.about-section'),
                smooth: true,
                smoothMobile: true,
                multiplier: 1,
                lerp: 0.06,
                smartphone: {
                    smooth: true,
                    locomotive: true,
                    init: true,
                    speed: 20,
                    multiplier: 2
                },
            });
        };

        const handleSplitText = () => {
            if (window.innerWidth > 500) {
                myDescriptionRef.current = Array.from(document.querySelectorAll('.myDescription-text'));
                if (myDescriptionRef.current.length > 0) {

                    myDescriptionRef.current.forEach((textElement) => {
                        // eslint-disable-next-line no-unused-vars
                        const text = new SplitType(textElement,
                            {
                                lineClass: 'description-line',
                                types: 'lines'
                            }
                        );
                    });
                }
            }
        };

        const handleResize = () => {
            if (scroll) {
                scroll.update();
                window.innerWidth > 500 ? scroll.on('scroll', handleScroll) : scroll.off('scroll', handleScroll);
            }
            handleSplitText();
        };

        const handleForLoopDebounce = debounce((array, instance, scrollY) => {
            for (const divElement of array) {
                if ((document.body.offsetHeight - (window.innerHeight / 16)) > instance.scroll.y + window.innerHeight) {
                    if (divElement.offsetTop < scrollY) {
                        divElement.style.backgroundSize = '100%';
                    } else {
                        break;
                    }
                } else {
                    divElement.style.backgroundSize = '100%';
                }
            }
        }, 40);

        const handleScroll = debounce((instance) => {
            if (window.innerWidth > 500) {
                descriptionLinesRef.current = Array.from(document.querySelectorAll('.description-line'));

                if (descriptionLinesRef.current.length > 0 && scroll) {
                    let divisor = 8;
                    if (window.innerWidth < 450) {
                        divisor = 1.5;
                    } else if (window.innerWidth < 800) {
                        divisor = 2;
                    } else if (window.innerWidth < 1000) {
                        divisor = 3;
                    } else if (window.innerWidth < 1200) {
                        divisor = 6;
                    }
                    const scrollY = instance.scroll.y + (window.innerHeight / divisor);
                    handleForLoopDebounce(descriptionLinesRef.current, instance, scrollY);
                }
            }
        }, 15.9);

        handleSplitText();
        createScroll();

        if (myNameRef.current) {
            getLetters(myNameRef.current, 'myName-letters');
            setTimeout(() => {
                document.querySelectorAll('.myName-letters')
                    .forEach((span) => {
                        span.style.transform = `translateY(0vw) rotate(0deg)`;
                    });
            }, 100);
        }
        if (aboutMeRef.current) {
            getLetters(aboutMeRef.current, 'resumee-letters');

            document.querySelectorAll('.resumee-letters').forEach((el, id) => {
                el.style.transform = `rotate(${id * 26}deg)`;
            });
        }

        window.innerWidth > 500 ? scroll.on('scroll', handleScroll) : scroll.off('scroll', handleScroll);

        setTimeout(() => {
            scroll ? scroll.update() : null;
        }, 500);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            scroll.destroy();
        };
    }, []);

    return (
        <>
            <section className="about-section">
                <header className="section-title" data-scroll-section>
                    <h1 ref={myNameRef} id='he-is-juanda'>{"He's JuanDa"}</h1>
                </header>
                <article className="section-content" data-scroll-section>
                    <div className='section-content__container'>
                        <div className='section-content__title'>
                            <h2 ref={aboutMeRef}>
                                ABOUT ME ABOUT ME
                            </h2>
                        </div>
                        <div className='content__icon'>
                            <span><img src={Logo} alt="He's JuanDa Logo" /></span>
                        </div>
                    </div>
                    <div className='section-content__about-me'>
                        <p className='myDescription-text'>
                            As a dedicated Software System Engineering student, I am motivated by a strong desire to flourish in the field of web development. My trip, however, does not finish there. I believe in leading a balanced and satisfying life, which involves remaining healthy and always learning new things. Allow me to take you on an enthralling voyage inside my life as a driven and varied individual.
                        </p>
                        <p className='myDescription-text'>
                            I knew I had found my calling the minute I discovered the intriguing world of web development. My imagination is captured by the power to bring ideas to life via code, to create seamless user experiences, and to create visually attractive websites. With a good understanding of programming languages such as JavaScript, HTML, and CSS, I am always challenging myself to learn frameworks like as React and Angular, staying current on trends and technologies to provide new solutions.
                        </p>
                        <p className='myDescription-text'>
                            Aside from my programming activities, I understand the importance of having a healthy body and mind. A regular gym regimen is an important component of my lifestyle since it not only improves my physical fitness but also provides the mental clarity and discipline required for top performance at work. I am able to offer a new perspective and steadfast attention to every endeavor I do because I maintain a well-rounded lifestyle.
                        </p>
                        <p className='myDescription-text'>
                            Learning is a lifetime process for me, and I have an insatiable need for information. Every day, I immerse myself in a wide range of topics, devouring books that stimulate personal and professional development. I broaden my grasp of the world and find inventive solutions to challenging challenges by staying motivated and accepting new ideas. Furthermore, I take advantage of any chance to improve my English language abilities by using platforms like Duolingo and watching instructive videos. This dedication to lifelong learning enables me to interact and collaborate successfully with a worldwide network of experts.
                        </p>
                        <p className='myDescription-text'>
                            While technical knowledge and personal development are important aspects of my path, my ultimate objective is to help businesses and companies succeed. I am enthusiastic about assisting companies in reaching their goals by utilizing my expertise to increase their online presence, boost client interaction, and create remarkable digital experiences. I want to offer effective solutions that take organizations to new heights of success via thorough problem-solving and a strong grasp of business objectives.
                        </p>
                    </div>
                </article>
            </section>
        </>
    );
};