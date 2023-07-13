import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Intro.css';

export const Intro = () => {
    const history = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            history('/home');
        }, 1200);
    }, []);

    return (
        <>
            <div className="intro-container">
                <h1>
                    PORTFOLIO
                </h1>
                <p>
                    {"by He's JuanDa"}
                </p>
            </div>
        </>
    );
};