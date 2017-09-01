import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';

const MyPolls = ({ user }) => {
  const noUserMsg = (
    <div className="fullscreen center-items">
      <Paper zDepth={2} className="width300 height200 flex-column padding10">
        <p className="padding10 text-center line-height-std">
          You need to be logged in to see this page.
        </p>
        <Link to="/authentication">
          <RaisedButton label="go to login page" primary />
        </Link>
      </Paper>
    </div>
  );

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
  const viewToRender = user === null ? noUserMsg : userUI;

  // undefined means the app does not know wheter user is logged in or not
  // the app waits for the response from firebase DB;
  return user !== undefined ? viewToRender : loader;
};

MyPolls.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
};

export default MyPolls;
