import { useEffect, useRef, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SOCIAL } from '../../constants';
import { Modal } from '../Modal/Modal';

//sendEmailResponse
import { sendEmail } from '../../services/services';
import LocomotiveScroll from 'locomotive-scroll';

import './Talk.css';

export const Talk = () => {

    const titleTalkSectionRef = useRef();

    const [showModal, setShowModal] = useState(false);
    const [modalOptions, setModalOptions] = useState({});
    const [currentWidth, setCurrentWidth] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleSubmitForm = useCallback((data) => {
        const response = sendEmail(data.Name, data.Email, data.Subject, data.Message);
        response.then((res) => {
            setShowModal(true);
            if (res === 'sent') {
                setModalOptions(() => {
                    return {
                        title: 'Email was Sent',
                        message: "I'll email you back ASAP",
                        type: 'check'
                    };
                });
                reset();
            } else {
                setModalOptions(() => {
                    return {
                        title: "Email wasn't Sent",
                        message: "Please try again",
                        type: 'error'
                    };
                });
            }
        });
    }, [reset]);

    const findErrorType = useCallback((type, minLength, maxLength, pattern) => {
        let errorMessage = '';
        const errorType = {
            "required": 'This field is required',
            "minLength": `Minumun ${minLength} characters`,
            "maxLength": `Maximun ${maxLength} characters`,
            "pattern": pattern,
        };
        for (let property in errorType) {
            if (property === type) {
                errorMessage = errorType[`${property}`];
                break;
            }
        }
        return errorMessage;
    }, []);

    const handleErrors = useCallback((error) => {
        let field = '';
        let message = '';
        if (error) {
            if (error.Name) {
                message = findErrorType(error.Name.type, 2, 30, 'Symbols not allowed');
                field = 'Name';
            } else if (error.Email) {
                message = findErrorType(error.Email.type, 5, 100, "It's not a valid email");
                field = 'Email';
            } else if (error.Subject) {
                message = findErrorType(error.Subject.type, 2, 50, 'Symbols not allowed');
                field = 'Subject';
            } else if (error.Message) {
                message = findErrorType(error.Message.type, 5, 500, 'Symbols not allowed');
                field = 'Message';
            }
            setShowModal(true);
            setModalOptions(() => {
                return {
                    title: `${field} is incorrect`,
                    message: message,
                    type: 'info'
                };
            });
        }
    }, [findErrorType]);

    useEffect(() => {
        setCurrentWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        let scroll = null;

        const createScroll = () => {
            scroll = new LocomotiveScroll({
                el: document.querySelector('.talk-section'),
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
        createScroll();

        const handleResize = () => {
            if (scroll) {
                scroll.update();
            }
            setCurrentWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        if (currentWidth < 800) {
            scroll.destroy();
        }
        return () => {
            window.removeEventListener('resize', handleResize);
            scroll.destroy();
        };

    }, [currentWidth]);

    return (
        <>
            {showModal ? (
                <Modal setShowModal={setShowModal} type={modalOptions.type} title={modalOptions.title} message={modalOptions.message} />
            ) : null}
            <section className='talk-section' data-scroll-section>
                <header className='talk-section__title'>
                    <h2 ref={titleTalkSectionRef}>
                        {"LET'S TALK"}
                    </h2>
                </header>
                <article className='talk-section__content'>
                    <div className='social-media'>
                        <div className='social-media__container'>
                            <ol>
                                {SOCIAL.map((social) => {
                                    return (
                                        <li key={social.id}>
                                            <h3 className='social-link'>
                                                <div></div>
                                                <a
                                                    href={social.link}
                                                    target='_blank'
                                                    rel="noreferrer"
                                                >
                                                    {social.name}
                                                </a>
                                            </h3>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                    <div className='form-container'>
                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className='name-form__container'>
                                <label htmlFor="name-input">Full Name</label>
                                <input
                                    id='name-input'
                                    type="text"
                                    name='Name'
                                    placeholder='Juan David Moreno A.'
                                    {...register('Name', {
                                        minLength: '2',
                                        maxLength: '30',
                                        pattern: /^[a-zA-Z\u00C0-\u017F\s]+$/,
                                        required: true
                                    })}
                                />
                            </div>
                            <div className='email-form__container'>
                                <label htmlFor="email-input">Email</label>
                                <input
                                    id='email-input'
                                    type="email"
                                    name='Email'
                                    placeholder='heisjuanda@gmail.com'
                                    {...register('Email', {
                                        minLength: '5',
                                        maxLength: '100',
                                        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        required: true
                                    })}
                                />
                            </div>
                            <div className='subject-form__container'>
                                <label htmlFor="subject-input">Subject</label>
                                <input
                                    id='subject-input'
                                    type="text"
                                    name='Subject'
                                    placeholder='I loved your portfolio!'
                                    {...register('Subject', { minLength: '2', maxLength: '50', required: true })}
                                />
                            </div>
                            <div className='message-form__container'>
                                <label htmlFor="message-input">Message</label>
                                <textarea
                                    name="Message"
                                    id="message-input"
                                    placeholder='I want to hire you'
                                    {...register('Message', { minLength: '5', maxLength: '500', required: true })}
                                >
                                </textarea>
                            </div>
                            <div className='send-form__container'>
                                <button onClick={() => { handleErrors(errors) }}>
                                    Shoot
                                </button>
                            </div>
                        </form>
                    </div>
                </article>
            </section>
        </>
    );
};