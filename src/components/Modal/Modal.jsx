import PropTypes from 'prop-types';
import { useEffect, useRef, useCallback } from 'react';

import closeB from '../../assets/images/icons/closeB.png';
import closeW from '../../assets/images/icons/closeW.png';

import './Modal.css';

export const Modal = (props) => {
    const {
        title,
        message,
        setShowModal,
        type
    } = props;

    const modalBodyRef = useRef();
    const closeModalImgRef = useRef();

    const handleCloseModal = useCallback(() => {
        const isDefined = modalBodyRef.current;
        if (isDefined) {
            modalBodyRef.current.classList.add('animation-hide');
            setTimeout(() => {
                setShowModal(false);
            }, 505);
        }
    }, [setShowModal]);

    const handleImgColorEnter = useCallback(() => {
        if (closeModalImgRef.current) {
            closeModalImgRef.current.style.opcity = '0';
            setTimeout(() => {
                closeModalImgRef.current.style.opcity = '1';
                closeModalImgRef.current.setAttribute('src',closeB);
            }, 100);
        }
    }, []);

    const handleImgColorLeave = useCallback(() => {
        if (closeModalImgRef.current) {
            closeModalImgRef.current.style.opcity = '0';
            setTimeout(() => {
                closeModalImgRef.current.style.opcity = '1';
                closeModalImgRef.current.setAttribute('src',closeW);
            }, 100);
        }
    }, []);

    useEffect(() => {
        const isDefined = modalBodyRef.current;
        if (isDefined) {
            window.innerWidth < 370 ? (
                modalBodyRef.current.style.top = `${(window.innerHeight / 2) - (modalBodyRef.current.offsetHeight)}px`
            ) : null;
            modalBodyRef.current.classList.add('animation-show');
            setTimeout(() => {
                modalBodyRef.current.classList.remove('animation-show');
            }, 501);
        }
    }, []);

    return (
        <div className='modal-container'>
            <div ref={modalBodyRef} className='modal-body'>
                <button
                    className='modal-close'
                    onClick={handleCloseModal}
                    onMouseEnter={handleImgColorEnter}
                    onMouseLeave={handleImgColorLeave} 
                >
                    <span>
                        <img ref={closeModalImgRef} src={closeW} alt="close icon x-mark" /></span>
                </button>
                <div className='modal-body__symbol'>
                    {type === 'check' ? (
                        <span><i className="fa-solid fa-circle-check"></i></span>
                    ) : null}
                    {type === 'error' ? (
                        <span><i className="fa-solid fa-circle-xmark"></i></span>
                    ) : null}
                    {type === 'info' ? (
                        <span><i className="fa-solid fa-circle-info"></i></span>
                    ) : null}
                </div>
                <div className='modal-body__title'>
                    <h2>{title}</h2>
                </div>
                <div className='modal-body__message'>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    setShowModal: PropTypes.func.isRequired,
    type: PropTypes.string,
}