import React from 'react';
import PropTypes from 'prop-types';

function Button({ color, text, onClick }) {
  return (
    <div>
      <button
        style={{ backgroundColor: color }}
        className="btn"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  text: PropTypes.string,
};
export default Button;
