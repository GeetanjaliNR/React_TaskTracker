import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

function Header({ title, onAdd, addState }) {
  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={addState ? 'red' : 'green'}
          text={addState ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
    </header>
  );
}

Header.defaultProps = {
  title: 'Task Tracker',
};

Header.prototype = {
  title: PropTypes.string.isRequired,
};
export default Header;
