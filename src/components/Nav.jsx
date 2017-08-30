import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const GuestNavButtons = () => (
  <div className="navButtons">
    <Link to="/"><FlatButton label="Home" /></Link>
    <Link to="/authentication"><FlatButton label="Login / Signup" /></Link>
  </div>
);


const Nav = () => (
  <AppBar
    title="Pointless Polls"
    showMenuIconButton={false}
    iconElementRight={<GuestNavButtons />}
  />
);
Nav.propTypes = {
};

export default Nav;
