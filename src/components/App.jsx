import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Nav from './Nav';
import PollsList from './PollsList';
import LoginSignup from './LoginSignup';
import MyPolls from './MyPolls';
import ViewPoll from './ViewPoll';
import NewPoll from './NewPoll';

injectTapEventPlugin();

class App extends React.Component {
  /**
   * Initiates the state.
   * Polls holds information about all the polls stored in the DB;
   * User(object || null || undefined)
   *      object -> user info;
   *      null -> user is not logged in
   *      undefined -> unknown, waiting for response from database
   * logoutDialogOpen(boolean) controls the logOut dialog;
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      polls: undefined,
      user: undefined,
      logoutDialogOpen: false,
    };
  }

  /**
   * componentDidMount
   * set a listener that watches if the user is logged in / out
   * set a listener that watches for polls database
   * @returns {undefined}
   */
  componentDidMount = () => {
    const auth = firebase.auth();
    const db = firebase.database().ref('/polls');

    this.authListener = auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });

    this.dbListener = db.on('value', (snap) => {
      this.setState({ polls: snap.val() });
    });
  }

  /**
   * componentWillUnmount
   * remove all the listeners;
   * @returns {undefined}
   */
  componentWillUnmount = () => {
    this.authListener.off();
    this.dbListener.off();
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
   * @returns {object} React element
   */
  render() {
    const logoutActions = [
      <RaisedButton label="OK" primary onTouchTap={this.closeLogoutDialog} />,
    ];

    const myPollsToRender = (
      <MyPolls
        user={this.state.user}
        polls={this.state.polls}
        removePoll={this.removePoll}
      />
    );
    const newPollToRender = <NewPoll user={this.state.user} />;
    const PollsListToRender = (
      <PollsList polls={this.state.polls} />
    );
    const renderPoll = props => (
      <ViewPoll
        poll={this.state.polls && this.state.polls[props.match.params.id]}
        user={this.state.user}
        pollID={props.match.params.id}
      />
    );

    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Nav user={this.state.user} logOut={this.logOut} />
            <main>
              <Switch>
                <Route exact path="/" render={() => PollsListToRender} />
                <Route path="/authentication" component={LoginSignup} />
                <Route path="/user/polls" render={() => myPollsToRender} />
                <Route path="/user/newpoll" render={() => newPollToRender} />
                <Route path="/poll/:id" render={renderPoll} />
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
