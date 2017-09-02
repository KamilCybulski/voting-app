import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const NoUserMessage = () => (
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

export default NoUserMessage;
