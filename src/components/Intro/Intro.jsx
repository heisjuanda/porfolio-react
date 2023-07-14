import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Intro.css';

export const Intro = () => {
    const history = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            history('/home');
        }, 2001);
    }, []);

    return (
        <>
            <div className="intro-container">
                <h1>
                    PORTFOLIO
                </h1>
                <p>
                    {"by @heisjuanda"}
                </p>
            </div>
        </>
    );
};