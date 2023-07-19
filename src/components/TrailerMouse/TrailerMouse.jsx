import PropTypes from 'prop-types';
import { useEffect, useRef, useState, useCallback } from 'react';

import defaultIcon from '../../assets/images/icons/defaultIcon.png';
import arrowRight from '../../assets/images/icons/arrowRightB.png';
import arrowDownB from '../../assets/images/icons/arrowDownB.png';

import './TrailerMouse.css';

export const TrailerMouse = (props) => {
    const {
        opacity,
        transition,
    } = props;

    const trailer = useRef();
    const icon = useRef();

    const [maxSize, setMaxSize] = useState(0);
    const [minSize, setMinSize] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    const getTrailerClass = useCallback(type => {
        const options = {
            "continue": arrowRight,
            "continue-Mobile": arrowDownB,
            "default": defaultIcon,
        };
        return options[type] || options['default'];
    }, []);

    const animateTrailer = useCallback((e, interacting) => {
        const x = e.clientX - (trailer.current.offsetWidth / 2),
            y = e.clientY - (trailer.current.offsetHeight / 2);
        if (window.innerWidth < 550) {
            setMaxSize(0.63);
            setMinSize(0.15);//0.15
        } else if (window.innerWidth < 700) {
            setMaxSize(0.75);
            setMinSize(0.2);//0.20
        } else if (window.innerWidth < 1000) {
            setMaxSize(0.87);
            setMinSize(0.2);//0.20
        } else {
            setMaxSize(1);
            setMinSize(0.25);//0.25
        }
        const keyframes = {
            transform: `translate(${x}px, ${y}px) scale(${interacting ? maxSize : minSize})`,
        }
        trailer.current.animate(keyframes, {
            duration: interacting ? 2000 : 800,
            fill: "forwards",
        });

    }, [maxSize, minSize]);

    useEffect(() => {
        setIsMobile(!(/Android/i.test(navigator.userAgent)) && !(/iPhone|iPad|iPod/i.test(navigator.userAgent)) && !(/Tablet/i.test(navigator.userAgent)));

        const handleResize = () => {
            setIsMobile(!(/Android/i.test(navigator.userAgent)) && !(/iPhone|iPad|iPod/i.test(navigator.userAgent)) && !(/Tablet/i.test(navigator.userAgent)));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            window.onmousemove = e => {
                const interactable = e.target.closest(".interactable"),
                    interacting = interactable !== null;

                animateTrailer(e, interacting);
                trailer.current.dataset.type = interacting ? interactable.dataset.type : "";

                if (interacting && icon.current) {
                    const newSrc = getTrailerClass(interactable.dataset.type);
                    if (newSrc === defaultIcon) {
                        icon.current.setAttribute("src", newSrc);
                        icon.current.style.opacity = 0;
                    } else {
                        icon.current.setAttribute("src", newSrc);
                        icon.current.style.opacity = 1;
                    }
                } else {
                    icon.current.setAttribute("src", defaultIcon);
                }

                if (trailer.current.dataset.type === 'button-click' ||
                    trailer.current.dataset.type === 'menu-option') {
                    trailer.current.style.border = '2px solid white';
                    trailer.current.style.backgroundColor = 'black';
                } else {
                    trailer.current.style.border = 'none';
                    trailer.current.style.backgroundColor = 'white';
                }
            }

            return () => {
                window.onmousemove = null;
            }
        }
    }, [animateTrailer, getTrailerClass, isMobile]);

    return (
        <>
            {isMobile ? (
                <div
                    ref={trailer}
                    id="trailer"
                    style={{ opacity: opacity, transition: `opacity ${transition}s` }}
                >
                    <span>
                        <img 
                            ref={icon} 
                            id="trailer-icon" 
                            src={''} 
                            alt="icon for trailer mouse" 
                            loading='lazy'
                        />
                    </span>
                </div>
            ) : null}
        </>
    );
};

TrailerMouse.propTypes = {
    opacity: PropTypes.string,
    transition: PropTypes.string,
};