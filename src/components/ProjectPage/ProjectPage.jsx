import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from 'react';

import getLetters from '../../helpers/getLetters';
import LocomotiveScroll from 'locomotive-scroll';
import Lottie from 'lottie-react';

import { PROJECTS } from '../../constants';

import arrowRight from '../../assets/images/icons/arrowRightW.png';
import arrowDownW from '../../assets/images/icons/arrowDownW.png';
import gitHubAnimation from '../../assets/animations/gitHubLink.json';

import './ProjectPage.css';

const ProjectPage = () => {

    const { id } = useParams();
    const history = useNavigate();

    const projectTitleRef = useRef([]);
    const transitionSectionRef = useRef();
    const animationTargetRef = useRef(null);
    const loadImgRef = useRef([]);

    const [project, setProject] = useState({});
    const [titleProject, setTitleProject] = useState([]);
    const [locomotive, setLocomotive] = useState();

    const handleNextProjectTransition = useCallback(() => {
        animationTargetRef.current = Array.from(document.querySelectorAll('.target-project__section'));

        const isThere = PROJECTS.length > (parseInt(id) + 1);
        if (transitionSectionRef.current && animationTargetRef.current) {
            for (const HTMLElement of animationTargetRef.current) {
                HTMLElement.style.opacity = '0';
            }
            transitionSectionRef.current.style.height = '100vh';
            transitionSectionRef.current.style.backgroundColor = 'var(--secundary-background)';

            setTimeout(() => {
                history(`../work/project/${isThere ? (parseInt(id) + 1) : 0}`, { replace: true });
                transitionSectionRef.current.style.height = '0vh';
                transitionSectionRef.current.style.backgroundColor = 'var(--main-background)';
                for (const HTMLElement of animationTargetRef.current) {
                    HTMLElement.style.opacity = '1';
                }
            }, 1100);
        }
    }, [history, id]);

    const handleImgLoading = useCallback((scroll) => {
        loadImgRef.current = Array.from(document.querySelectorAll('.img-load__target'));
        if (loadImgRef.current.length > 0) {
            for (const img of loadImgRef.current) {
                img.onload = () => {
                    scroll.update();
                }
            }
        }
    }, []);

    const handleGitLink = useCallback(() => {
        window.open(project.gitLink, '_blank');
    }, [project.gitLink]);

    useEffect(() => {
        handleImgLoading(locomotive);
    }, [handleImgLoading, locomotive]);

    useEffect(() => {
        let scroll = null;

        const createScroll = () => {
            //locomotive
            scroll = new LocomotiveScroll({
                el: document.querySelector('.project-page__section'),
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
            setLocomotive(scroll);
        };

        const handleResize = () => {
            if (scroll) {
                scroll.update();
            }
        };

        createScroll();

        setTimeout(() => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    scroll.scrollTo(this.getAttribute('href'));
                });
            });
        }, 50);


        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            scroll.destroy();
        };
    }, [id]);

    useEffect(() => {
        setProject(PROJECTS[id]);

        setTitleProject(`${project.title}`.split(' '));
    }, [id, project]);

    useEffect(() => {
        projectTitleRef.current = Array.from(document.querySelectorAll('.title__target'));
        if (projectTitleRef.current.length > 0) {
            for (const word of projectTitleRef.current) {
                word.style.opacity = '0';
                getLetters(word, 'projectTitle-letters');
            }
            setTimeout(() => {
                for (const word of projectTitleRef.current) {
                    word.style.opacity = '1';
                }
                document.querySelectorAll('.projectTitle-letters')
                    .forEach((span) => {
                        span.style.transform = `translateY(0vw)`;
                        span.style.opacity = `1`;
                    });
            }, 100);
        }
    }, [titleProject]);

    return (
        <>
            <div ref={transitionSectionRef} className='project-page__next-project-transition'></div>
            <section className='project-page__section'>
                <main>
                    <header className='project-page__section-title'>
                        <div>
                            {titleProject.map((word, id) => {
                                return (
                                    <h2
                                        key={id}
                                        className='title__target'
                                    >
                                        {word.toUpperCase()}
                                    </h2>
                                );
                            })}
                        </div>
                    </header>
                    <div className='about-project'>
                        <p>{project.intro}</p>
                        <div>
                            <span>
                                <a href="#about-project">
                                    <img src={arrowDownW} alt="down arrow" />
                                    <img src={arrowDownW} alt="down arrow" />
                                </a>
                            </span>
                        </div>
                        <div>
                            <img
                                className='img-load__target'
                                src={project.demo}
                                alt="Demo of my project"
                            />
                        </div>
                    </div>
                </main>
                <article className='project-page__section-content'>
                    <h2 id='about-project'>
                        ABOUT
                    </h2>
                    <div>
                        {project.about ? (
                            <>
                                <div className='section-content__about'>
                                    <h2>
                                        OBJETIVES
                                    </h2>
                                    {project.about.objetive.map((objetive, id) => {
                                        return (
                                            <ol key={id}>
                                                <li>
                                                    <p>
                                                        {objetive}
                                                    </p>
                                                </li>
                                            </ol>
                                        );
                                    })}
                                </div>
                                <div className='section-content__about'>
                                    <h2>
                                        GOALS
                                    </h2>
                                    {project.about.goal.map((goal, id) => {
                                        return (
                                            <ol key={id}>
                                                <li>
                                                    <p>
                                                        {goal}
                                                    </p>
                                                </li>
                                            </ol>
                                        );
                                    })}
                                </div>
                                <div className='section-content__about'>
                                    <h2>
                                        TECH STACK
                                    </h2>
                                    {project.about.tech.map((tech, id) => {
                                        return (
                                            <ol key={id}>
                                                <li>
                                                    <p>
                                                        {tech}
                                                    </p>
                                                </li>
                                            </ol>
                                        );
                                    })}
                                </div>
                            </>
                        ) : null}
                    </div>
                </article>
                <article className='project-page__section-details'>
                    <h2>
                        PROJECT DETAILS
                    </h2>
                    <p>
                        Discover detailed information about my most recent projects and see how I create aesthetically appealing and extremely effective websites
                    </p>
                    <Lottie
                        className='sectuib-details__animation'
                        animationData={gitHubAnimation}
                        onClick={handleGitLink}
                    />
                    <div className='section-details__img'>
                        {project.detailsImg ? (
                            project.detailsImg.map((img, id) => {
                                return (
                                    <div key={id}>
                                        <img
                                            src={img}
                                            alt="Project Demo device"
                                            className='img-load__target'
                                        />
                                    </div>
                                );
                            })
                        ) : null}
                    </div>
                </article>
                <article className='section-end__next'>
                    <h2 ref={animationTargetRef} className='target-project__section'>
                        Next Project
                    </h2>
                    <button ref={animationTargetRef} className='target-project__section' onClick={handleNextProjectTransition}>
                        Here <span>
                            <img
                                src={arrowRight}
                                alt="Arrow to go to another project"
                            />
                            <img
                                src={arrowRight}
                                alt="Arrow to go to another project"
                            />
                        </span>
                    </button>
                </article>
            </section>
        </>

    );
};

export default ProjectPage;