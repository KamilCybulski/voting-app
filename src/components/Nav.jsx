import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const Nav = ({ user, logOut }) => {
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

  // null means user is not logged in;
  const iconElementRight = user === null ? guestNavButtons : userNavButtons;

  const iconStyleRight = {
    margin: '0',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
  };

  const titleStyle = {
    textDecoration: 'none',
    color: '#fff',
  };

  return (
    <AppBar
      title={<Link style={titleStyle} to="/">Pointless Polls</Link>}
      showMenuIconButton={false}
      // undefined means the app does not know wheter user is logged in or not
      // the app waits for the response from firebase DB;
      iconElementRight={user !== undefined ? iconElementRight : null}
      iconStyleRight={iconStyleRight}
    />
  );
};

Nav.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
};

export default Nav;
