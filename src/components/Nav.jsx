import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Nav = ({ userLoggedIn, logOut }) => {
  const guestNavButtons = (
    <div>
      <Link to="/"><FlatButton label="Home" /></Link>
      <Link to="/authentication"><FlatButton label="Login / Signup" /></Link>
    </div>
);

  const userNavButtons = (
    <div>
      <Link to="/"><FlatButton label="Home" /></Link>
      <Link to="/user/polls"><FlatButton label="My polls" /></Link>
      <FlatButton label="Logout" onTouchTap={logOut} />
    </div>
  );

  return (
    <AppBar
      title="Pointless Polls"
      showMenuIconButton={false}
      iconElementRight={userLoggedIn ? userNavButtons : guestNavButtons}
    />
  );
};

Nav.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default Nav;
