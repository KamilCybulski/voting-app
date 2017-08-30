import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Nav from './Nav';
import PollsGrid from './PollsGrid';
import LoginSignup from './LoginSignup';
import MyPolls from './MyPolls';
import ViewPoll from './ViewPoll';

injectTapEventPlugin();

class App extends React.Component {
  /**
   * Initiates the state.
   * Polls holds information about all the polls stored in the DB;
   * User(object || null) holds information about the currently logged user;
   * logoutDialogOpen(boolean) controls the logOut dialog;
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      polls: null,
      user: null,
      logoutDialogOpen: false,
    };
  }

  /**
   * componenDidMount
   * set a listener that updates a state after a user logs in or out;
   * @returns {undefined}
   */
  componentDidMount = () => {
    const auth = firebase.auth();
    this.authListener = auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  /**
   * componentWillUnmount
   * remove all the listeners;
   * @returns {undefined}
   */
  componentWillUnmount = () => {
    this.authListener.off();
  }

  /**
   * logOut
   * logout the user;
   * open the logoutDialog
   * @returns {undefined}
   */
  logOut = () => {
    firebase.auth().signOut()
      .then(() => {
        this.setState({ logoutDialogOpen: true });
      });
  }

  /**
   * closeLogoutDialog
   * set state.logoutDialogOpen to false;
   * @returns {undefined}
   */
  closeLogoutDialog = () => {
    this.setState({ logoutDialogOpen: false });
  }

/**
 * render
 * @return {object} React Element
 */
  render() {
    const userLoggedIn = !!this.state.user;

    const logoutActions = [
      <RaisedButton label="OK" primary onTouchTap={this.closeLogoutDialog} />,
    ];

    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Nav userLoggedIn={userLoggedIn} logOut={this.logOut} />
            <main>
              <Switch>
                <Route exact path="/" component={PollsGrid} />
                <Route path="/authentication" component={LoginSignup} />
                <Route path="/user/polls" component={MyPolls} />
                <Route path="/poll/:id" component={ViewPoll} />
              </Switch>
            </main>

            <Dialog
              className="width300"
              title="See you!"
              open={this.state.logoutDialogOpen}
              modal={false}
              actions={logoutActions}
              onRequestClose={this.closeLogoutDialog}
            >
              You have been logged out
            </Dialog>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}


export default App;
