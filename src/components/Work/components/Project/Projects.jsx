import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import plusB from '../../../../assets/images/icons/plusB.png';
import plusW from '../../../../assets/images/icons/plusW.png';

import './Projects.css';

export const Projects = (props) => {
    const {
        width,
        title,
        images,
        description,
        number,
        scroll,
        transition
    } = props;

    const history = useNavigate();

    const targetImgRef = useRef([]);
    const iconBtnTargetRef = useRef([]);

    const handleSeeProject = useCallback(() => {
        transition();
        setTimeout(() => {
            history(`/work/project/${number - 1}`);
        }, 1610);
    }, [history, number, transition]);

    const handleImgUpdates = useCallback(() => {
        scroll ? scroll.update() : null;
    }, [scroll]);

    const handleIconColorEnter = useCallback(() => {
        iconBtnTargetRef.current = document.querySelectorAll('.icon-btn__target');
        if (iconBtnTargetRef.current.length > 0) {
            for (const img of iconBtnTargetRef.current) {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.setAttribute('src', plusB);
                }, 150);
            }
        }
    }, []);

    const handleIconColorLeave = useCallback(() => {
        iconBtnTargetRef.current = document.querySelectorAll('.icon-btn__target');
        if (iconBtnTargetRef.current.length > 0) {
            for (const img of iconBtnTargetRef.current) {
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.setAttribute('src', plusW);
                }, 150);
            }
        }
    }, []);

    useEffect(() => {
        if (width > 800) {
            targetImgRef.current = Array.from(document.querySelectorAll('.target-img'));
            const handleScroll = debounce((instance) => {
                const scrollY = (instance.scroll.y + ((window.innerWidth) / 2));
                targetImgRef.current.forEach((element) => {
                    if (element?.getClientRects()[0]?.x) {
                        if (!element.classList.value.includes('show-img') &&
                            (element.getClientRects()[0].x) <= scrollY) {
                            element.classList.add('show-img');
                            width <= 800 ? scroll.update() : null;
                        }
                    }
                });
            }, 15.9);

            if (targetImgRef.current.length > 0 && scroll) {
                scroll.on('scroll', handleScroll);
            }
        }
    }, [scroll, width]);

    return (
        <>
            <section className='project-section'>
                <header className='project-section__title'>
                    <h2 className='title-repeat' data-scroll data-scroll-speed={number % 2 === 0 ? '5' : '-5'} data-scroll-direction="horizontal">
                        {width > 801 ? (
                            `${title} - `.repeat(5) + title
                        ) : (
                            `${title} - `.repeat(2) + title
                        )}
                    </h2>
                </header>
                <article className='project-section__content'>
                    <div>
                        <div data-type='img-work' className='content-img__container interactable'>
                            <img
                                onLoad={handleImgUpdates}
                                className='target-img'
                                src={images[0]}
                                alt={`Project logo that describes my work`}
                            />
                            <img
                                onLoad={handleImgUpdates}
                                src={images[1]}
                                alt={`Project image that describes my work`}
                            />
                        </div>
                        <div className='content-title__container' data-scroll data-scroll-direction="horizontal" data-scroll-speed={width > 801 ? "2" : number % 2 === 0 ? '-2' : '2'}>
                            <div className='container__title-date'>
                                <div>
                                    <h2>0{number}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='content-description__container'>
                        <div className='container__des-see'>
                            <div>
                                <p>
                                    {description}
                                </p>
                            </div>
                            <button
                                className='interactable'
                                data-type='button-click'
                                onClick={handleSeeProject}
                                onMouseEnter={handleIconColorEnter}
                                onMouseLeave={handleIconColorLeave}
                                onTouchStart={handleIconColorEnter}
                                onTouchEnd={handleIconColorLeave}
                            >
                                See more
                                <span>
                                    <img className='icon-btn__target' src={plusW} alt="plus icon" />
                                </span>
                            </button>
                        </div>
                    </div>
                </article>

            </section>
        </>
    );
};

Projects.propTypes = {
    width: PropTypes.number,
    title: PropTypes.string,
    images: PropTypes.any,
    description: PropTypes.string,
    number: PropTypes.string,
    scroll: PropTypes.any,
    transition: PropTypes.any,
}