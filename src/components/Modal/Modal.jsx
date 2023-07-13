import PropTypes from 'prop-types';
import { useEffect, useRef, useCallback } from 'react';

import './Modal.css';

export const Modal = (props) => {
    const {
        title,
        message,
        setShowModal,
        type
    } = props;

    const modalBodyRef = useRef();

    const handleCloseModal = useCallback(() => {
        const isDefined = modalBodyRef.current;
        if (isDefined) {
            modalBodyRef.current.classList.add('animation-hide');
            setTimeout(() => {
                setShowModal(false);
                //modalBodyRef.current.classList.remove('animation-hide');
            }, 505);
        }
    }, [setShowModal]);

    useEffect(() => {
        const isDefined = modalBodyRef.current;
        if (isDefined) {
            modalBodyRef.current.classList.add('animation-show');
            setTimeout(() => {
                modalBodyRef.current.classList.remove('animation-show');
            }, 501);
        }
    }, []);

    return (
        <div className='modal-container'>
            <div ref={modalBodyRef} className='modal-body'>
                <button className='modal-close' onClick={handleCloseModal}>
                    <span><i className="fa-solid fa-xmark"></i></span>
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