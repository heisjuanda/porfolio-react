import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import getLetters from '../../../../helpers/getLetters';
import LocomotiveScroll from 'locomotive-scroll';

import { PROJECTS } from '../../../../constants';

import './ProjectPage.css';

export const ProjectPage = () => {

    const { id } = useParams();

    const projectTitleRef = useRef([]);

    const [project, setProject] = useState({});
    const [titleProject, setTitleProject] = useState([]);

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
        };

        const handleResize = () => {
            if (scroll) {
                scroll.update();
            }
        };

        createScroll();

        setTimeout(() => {
            scroll ? scroll.update() : null;
        }, 500);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            scroll.destroy();
        };
    }, []);

    useEffect(() => {
        setProject(PROJECTS[id]);

        setTitleProject(`${project.title}`.split(' '));
    }, [id, project]);

    useEffect(() => {
        projectTitleRef.current = Array.from(document.querySelectorAll('.title__target'));
        if (projectTitleRef.current.length > 0) {
            for (const word of projectTitleRef.current) {
                getLetters(word, 'projectTitle-letters');
            }
            setTimeout(() => {
                document.querySelectorAll('.projectTitle-letters')
                    .forEach((span) => {
                        span.style.transform = `translateY(0vw)`;
                        span.style.opacity = `1`;
                    });
            }, 100);
        }
    }, [titleProject]);

    return (
        <section className='project-page__section'>
            <>
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
                <article className='project-page__section-content'>
                    <div>
                        {project.images ? (
                            project.images.map((img, id) => {
                                if (id !== 0) {
                                    return (
                                        <div key={id}>
                                            <p>
                                                Patias A Casa
                                            </p>
                                            <img
                                                src={img}
                                                alt={`Picture about my work number ${id}`}
                                            />
                                        </div>
                                    );
                                }
                            })
                        ) : null}
                    </div>
                </article>
            </>

        </section>
    );
};