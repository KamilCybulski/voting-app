import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router-dom';

class MyPolls extends React.Component {
  /**
   * @param {object} props
   * newPollName(string) holds a name for the new poll;
   * newPollOptions(Array of objects) holds options for the new poll;
   * newPollDialogOpen(boolean) if true, open a dialog for making a new poll;
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      newPollName: '',
      newPollOptions: [],
      newPollDialogOpen: false,
    };
  }

  /**
   * openDialog
   * opens the new poll dialog
   * @returns {undefined}
   */
  openDialog = () => {
    this.setState({ newPollDialogOpen: true });
  }

  /**
   * closeDialog
   * closes the new poll dialog
   * @returns {undefined}
   */
  closeDialog = () => {
    this.setState({ newPollDialogOpen: false });
  }

  /**
   * saveToDb
   * saves the poll held in a state to the database
   * @returns {Promise} contains void
   */
  saveToDB = () => {
    const data = {
      name: 'Kirk vs Piccard',
      owner: 'kamyl@test.pl',
      options: [
        {
          name: 'Piccard',
          votes: 10,
        },
        {
          name: 'Kirk',
          votes: 15,
        },
      ],
    };

    const newPoll = firebase.database().ref('/polls').push().key;
    return firebase.database().ref().update({ [`/polls/${newPoll}`]: data });
  }


  /**
   * @returns {object} React element
   */
  render() {
    const dialogActions = [
      <RaisedButton
        label="Cancel"
        primary
        onClick={this.closeDialog}
      />,
      <RaisedButton
        label="Submit"
        style={{ marginLeft: '5px' }}
        primary
        onClick={this.closeDialog}
      />,
    ];

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
        <RaisedButton
          label="Make a new poll"
          primary
          onTouchTap={this.saveToDB}
        />

        <Dialog
          title="New poll"
          actions={dialogActions}
          modal
          open={this.state.newPollDialogOpen}
        >
          Your new poll
        </Dialog>
      </div>
    );

    const loader = (
      <div className="fullscreen center-items">
        <CircularProgress size={120} thickness={8} />
      </div>
    );

    // null means user is not logged in;
    const viewToRender = this.props.user === null ? noUserMsg : userUI;

    // undefined means the app does not know wheter user is logged in or not
    // the app waits for the response from firebase DB;
    return this.props.user !== undefined ? viewToRender : loader;
  }
}

MyPolls.propTypes = {
  user: PropTypes.object,
};

export default MyPolls;
