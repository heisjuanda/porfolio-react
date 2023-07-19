import PropTypes from 'prop-types';

import './Loader.css';

export const Loader = ({ color }) => {
    return (
        <div 
            className='loader-component__suspense'
            style={
                {backgroundColor: color}
            }
        ></div>
    );
};

Loader.propTypes = {
    color: PropTypes.string,
};