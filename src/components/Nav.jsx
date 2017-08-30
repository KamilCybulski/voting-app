import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/authentication">Login / Signup</Link>
  </div>
);
Nav.propTypes = {
};

export default Nav;
