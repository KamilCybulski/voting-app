import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';
import NoUserMessage from '../utils/NoUserMessage';

const MyPolls = ({ user }) => {
  const userUI = (
    <div className="fullscreen center-items">
      <Link to="/user/newpoll">
        <RaisedButton label="Make a new poll" primary />
      </Link>
    </div>
  );

  const loader = (
    <div className="fullscreen center-items">
      <CircularProgress size={120} thickness={8} />
    </div>
  );

  // null means user is not logged in;
  const viewToRender = user === null ? <NoUserMessage /> : userUI;

  // undefined means the app does not know wheter user is logged in or not
  // the app waits for the response from firebase DB;
  return user !== undefined ? viewToRender : loader;
};

MyPolls.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
};

export default MyPolls;
