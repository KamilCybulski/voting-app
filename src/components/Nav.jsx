import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const guestNavButtons = (
  <div className="navButtons">
    <Link to="/"><FlatButton label="Home" /></Link>
    <Link to="/authentication"><FlatButton label="Login / Signup" /></Link>
  </div>
);

const userNavButtons = (
  <div className="navButtons">
    <Link to="/"><FlatButton label="Home" /></Link>
    <Link to="/user/polls"><FlatButton label="My polls" /></Link>
    <FlatButton label="Logout" />
  </div>
);


const Nav = ({ userLoggedIn }) => (
  <AppBar
    title="Pointless Polls"
    showMenuIconButton={false}
    iconElementRight={userLoggedIn ? userNavButtons : guestNavButtons}
  />
);
Nav.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default Nav;
