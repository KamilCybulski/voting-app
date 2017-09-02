import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import NoUserMessage from '../utils/NoUserMessage';
import Loader from '../utils/Loader';

const MyPolls = ({ user }) => {
  const userInterface = (
    <div className="fullscreen center-items">
      <Link to="/user/newpoll">
        <RaisedButton label="Make a new poll" primary />
      </Link>
    </div>
  );

  // null means user is not logged in;
  const viewToRender = user === null ? <NoUserMessage /> : userInterface;

  // undefined means the app does not know wheter user is logged in or not
  // the app waits for the response from firebase DB;
  return user !== undefined ? viewToRender : <Loader />;
};

MyPolls.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string }),
};

export default MyPolls;
