import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';

import './Menu.css';

export const Menu = () => {
    const history = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);

    const firstLineRef = useRef();
    const secondLineRef = useRef();
    const thirdLineRef = useRef();
    const burgerBtnRef = useRef();

    const menuContainerRef = useRef();
    const menuOptionsContainerRef = useRef();
    const menuLinkOptionsRef = useRef([]);

    useEffect(() => {
        menuLinkOptionsRef.current = Array.from(document.querySelectorAll('.text-link__nav'));
    }, []);

    const handleMenuBton = useCallback(async (isOpen) => {
        const isDefined =
            firstLineRef.current &&
            secondLineRef.current &&
            thirdLineRef.current;

        if (isDefined) {
            const transformValue = isOpen ? '9px' : '0px';
            const rotateValue = isOpen ? '45deg' : '0deg';
            const opacityValue = isOpen ? '0' : '1';

            firstLineRef.current.style.transform = `translateY(${transformValue}) rotate(${rotateValue})`;
            secondLineRef.current.style.opacity = opacityValue;
            thirdLineRef.current.style.transform = `translateY(-${transformValue}) rotate(-${rotateValue})`;
        }
    }, [firstLineRef, secondLineRef, thirdLineRef]);

    const handleMenu = useCallback(() => {
        const isDefined = menuContainerRef.current && menuLinkOptionsRef.current && menuOptionsContainerRef.current && burgerBtnRef.current;
        if (isDefined) {
            setIsDisabledBtn(true);
            setTimeout(() => {
                setIsDisabledBtn(false);
            }, 400);
            if (!isOpen) {
                menuContainerRef.current.style.animation = 'showMenuContainer 0.4s ease-in-out forwards';
                handleMenuBton(!isOpen);
                setIsOpen(!isOpen);
                menuLinkOptionsRef.current.forEach((option) => {
                    setTimeout(() => {
                        option.style.opacity = '1';
                    }, 200);
                    menuOptionsContainerRef.current.style.display = 'block';
                });
            } else {
                menuLinkOptionsRef.current.forEach((option) => {
                    option.style.transitionDelay = '0s';
                    option.style.opacity = '0';
                    setTimeout(() => {
                        menuOptionsContainerRef.current.style.display = 'none';
                    }, 200);
                });
                menuContainerRef.current.style.animation = 'hideMenuContainer 0.4s ease-in-out forwards';
                handleMenuBton(!isOpen);
                setIsOpen(!isOpen);
                setTimeout(() => {
                    menuContainerRef.current.style.transform = 'translate(-100%, -100%) rotate(45deg)';
                }, 400);
            }
        }
    }, [isOpen, menuContainerRef, menuLinkOptionsRef, menuOptionsContainerRef, handleMenuBton, setIsOpen]);

    const handleCloseMenu = useCallback(() => {
        const isDefined =
            menuContainerRef.current &&
            menuLinkOptionsRef.current &&
            menuOptionsContainerRef.current;

        if (isDefined) {
            const optionStyles = {
                transitionDelay: '0s',
                opacity: '0'
            };

            menuLinkOptionsRef.current.forEach(option => {
                Object.assign(option.style, optionStyles);
            });

            setTimeout(() => {
                menuOptionsContainerRef.current.style.display = 'none';
            }, 200);

            menuContainerRef.current.style.animation = 'hideMenuContainer 0.4s ease-in-out forwards';
            handleMenuBton(!isOpen);
            setIsOpen(prevIsOpen => !prevIsOpen);

            setTimeout(() => {
                menuContainerRef.current.style.transform = 'translate(-100%, -100%) rotate(45deg)';
            }, 400);
        }
    }, [isOpen, menuContainerRef, menuLinkOptionsRef, menuOptionsContainerRef, handleMenuBton, setIsOpen]);

    return (
        <>
            <button 
                role='button' 
                title='burger-menu' 
                ref={burgerBtnRef} 
                className="burger-btn interactable" 
                onClick={handleMenu}
                disabled={isDisabledBtn}
            >
                <span ref={firstLineRef} id='burger-btn__one'></span>
                <span ref={secondLineRef} id='burger-btn__two'></span>
                <span ref={thirdLineRef} id='burger-btn__three'></span>
            </button>
            <div ref={menuContainerRef} className='menu-container'></div>
            <div ref={menuOptionsContainerRef} className='menu-options'>
                <nav className='menu-options__nav'>
                    <ol>
                        <li>
                            <p className='text-link__nav'>
                                <span
                                    className='interactable'
                                    data-type='menu-option'
                                    onClick={() => {
                                        history('/home');
                                        handleCloseMenu()
                                    }}
                                >
                                    Home
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className='text-link__nav'>
                                <span
                                    className='interactable'
                                    data-type='menu-option'
                                    onClick={() => {
                                        history('/about');
                                        handleCloseMenu()
                                    }}
                                >
                                    About
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className='text-link__nav'>
                                <span
                                    className='interactable'
                                    data-type='menu-option'
                                    onClick={() => {
                                        history('/work');
                                        handleCloseMenu()
                                    }}
                                >
                                    Work
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className='text-link__nav'>
                                <span
                                    className='interactable'
                                    data-type='menu-option'
                                    onClick={() => {
                                        history('/contact');
                                        handleCloseMenu()
                                    }}
                                >
                                    Talk
                                </span>
                            </p>
                        </li>
                        <li>
                            <p className='text-link__nav' id='text-close__nav'>
                                <span
                                    className='interactable'
                                    data-type='menu-option'
                                    onClick={() => {
                                        handleCloseMenu()
                                    }}
                                >
                                    Close
                                </span>
                            </p>
                        </li>
                    </ol>
                </nav>
            </div>
        </>
    );
};