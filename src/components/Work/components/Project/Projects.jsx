import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const handleSeeProject = useCallback(() => {
        transition();
        setTimeout(() => {
            history(`/work/project/${number - 1}`);
        }, 1005);
    }, [history, number, transition]);

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
        } else {
            setTimeout(() => {
                scroll ? scroll.update() : null;
            }, 500);
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
                        <div className='content-img__container'>
                            <img className='target-img' src={images} alt={`Project image that describes my work`} />
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
                                    <b>
                                        {description}
                                    </b>
                                </p>
                            </div>
                            <button className='interactable' data-type='button-click' onClick={handleSeeProject}>
                                See more <span><i className="fa-light fa-plus"></i></span>
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