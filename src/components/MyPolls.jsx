import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ClearIcon from 'material-ui/svg-icons/content/clear';

import NoUserMessage from '../utils/NoUserMessage';
import Loader from '../utils/Loader';

class MyPolls extends React.Component {
  /**
   * @param {object} props Props passed from App component
   * confirmDialogOpen controls if dialog for removing a poll is visible
   * pollID is an ID of a poll to be removed
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogOpen: false,
      pollID: '',
    };
  }

  openDialog = (id) => {
    this.setState({
      confirmDialogOpen: true,
      pollID: id,
    });
  }

  closeDialog = () => {
    this.setState({
      confirmDialogOpen: false,
      pollID: '',
    });
  }

  /**
   * removePoll
   * removes poll with given ID from the database
   * @param {string} pollID ID of a poll
   * @returns {undefined}
   */
  removePoll = () => {
    const pollID = this.state.pollID;
    const poll = firebase.database().ref(`/polls/${pollID}`);
    poll.remove();
    this.closeDialog();
  }

  /**
   * @returns {object} React Element
   */
  render() {
    const dialogActions = [
      <RaisedButton
        className="margin10"
        label="Cancel"
        primary
        onClick={this.closeDialog}
      />,
      <RaisedButton
        className="margin10"
        label="Confirm"
        primary
        onClick={this.removePoll}
      />,
    ];

      // null means user is not logged in;
    if (this.props.user === null) {
      return <NoUserMessage />;
    }
    // undefined means the app waits for the data from firebase DB;
    if (this.props.user === undefined || this.props.polls === undefined) {
      return <Loader />;
    }

    return (
      <main className="fullscreen flex-column-flex-start">
        <div className="center-items margin-top-50 margin-bot-50">
          <Link to="/user/newpoll">
            <RaisedButton label="Make a new poll" primary />
          </Link>
        </div>
        <div className="center-items margin-top-50 margin-bot-50">
          <List>
            {Object.values(this.props.polls)
              .filter(poll => poll.owners_id === this.props.user.uid)
              .map(poll => (
                <div key={poll.id} >
                  <div className="flex-row width200">
                    <Link to={`/poll/${poll.id}`} className="no-text-decor">
                      <ListItem
                        style={{ width: '170px' }}
                        primaryText={poll.name}
                        secondaryText="See the poll results"
                      />
                    </Link>
                    <FlatButton
                      style={{ minWidth: '30px' }}
                      secondary
                      icon={<ClearIcon />}
                      onClick={() => { this.openDialog(poll.id); }}
                    />
                  </div>
                  <Divider />
                </div>
              ))}
          </List>
        </div>

        <Dialog
          title="Confirm"
          modal
          actions={dialogActions}
          open={this.state.confirmDialogOpen}
        >
          Are you sure you want to delete this poll?
        </Dialog>
      </main>
    );
  }
}


MyPolls.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
  polls: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default MyPolls;
