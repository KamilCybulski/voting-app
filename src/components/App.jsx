import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Nav from './Nav';
import PollsGrid from './PollsGrid';
import LoginSignup from './LoginSignup';
import MyPolls from './MyPolls';
import ViewPoll from './ViewPoll';

injectTapEventPlugin();

class App extends React.Component {
  /**
   * Initiates the state.
   * Polls holds information about all the polls stored in the DB.
   * User holds information about the currently logged used. Null if not logged.
   * @constructor
   */
  constructor() {
    super();

    this.state = {
      polls: null,
      user: null,
    };
  }

/**
 * @return {object} React Element
 */
  render() {
    const userLoggedIn = !!this.state.user;

    return (
      <MuiThemeProvider>
        <HashRouter>
          <div>
            <Nav userLoggedIn={userLoggedIn} />
            <main>
              <Switch>
                <Route exact path="/" component={PollsGrid} />
                <Route path="/authentication" component={LoginSignup} />
                <Route path="/user/polls" component={MyPolls} />
                <Route path="/poll/:id" component={ViewPoll} />
              </Switch>
            </main>
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}


export default App;
