import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
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
          onTouchTap={this.openDialog}
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

    return this.props.userLoggedIn ? userUI : noUserMsg;
  }
}

MyPolls.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default MyPolls;
