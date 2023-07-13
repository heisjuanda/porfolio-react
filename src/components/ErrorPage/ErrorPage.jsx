import { useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';
import notFound from '../../assets/animations/404Page.json';

import './ErrorPage.css';

export const ErrorPage = () => {
    const history = useNavigate();

    return (
        <section className='error-section'>
            <header className='error-section__go-back'>
                <button onClick={() => {history('/home')}}>
                    Home
                </button>
            </header>
            <article className='error-section__animation'>
                <Lottie className='error-page' animationData={notFound} />
            </article>
        </section>
    );
};