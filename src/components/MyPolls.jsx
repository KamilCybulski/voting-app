import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import NoUserMessage from '../utils/NoUserMessage';
import Loader from '../utils/Loader';

const MyPolls = ({ user, polls, removePoll }) => {
  // null means user is not logged in;
  if (user === null) {
    return <NoUserMessage />;
  }
  // undefined means the app waits for the data from firebase DB;
  if (user === undefined || polls === undefined) {
    return <Loader />;
  }

  return (
    <div className="fullscreen flex-column">
      <div className="center-items">
        <Link to="/user/newpoll">
          <RaisedButton label="Make a new poll" primary />
        </Link>
      </div>
      <div className="center-items">
        <List>
          {Object.values(polls)
            .filter(poll => poll.owners_id === user.uid)
            .map(poll => (
              <div key={poll.id} >
                <div className="flex-row width200">
                  <Link to={`/poll/${poll.id}`} className="no-text-decor">
                    <ListItem
                      primaryText={poll.name}
                      secondaryText="See the poll results"
                    />
                  </Link>
                  <FlatButton
                    style={{ minWidth: '30px' }}
                    secondary
                    icon={<ClearIcon />}
                    onClick={() => { removePoll(poll.id); }}
                  />
                </div>
                <Divider />
              </div>
            ))}
        </List>
      </div>
    </div>
  );
};

MyPolls.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
  polls: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  removePoll: PropTypes.func.isRequired,
};

export default MyPolls;
