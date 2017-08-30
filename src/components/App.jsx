import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import PollsGrid from './PollsGrid';
import LoginSignup from './LoginSignup';
import MyPolls from './MyPolls';
import ViewPoll from './ViewPoll';

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
    return (
      <HashRouter>
        <div>
          <Nav />
          <main>
            <div>This is App.</div>

            <Switch>
              <Route exact path="/" component={PollsGrid} />
              <Route path="/authentication" component={LoginSignup} />
              <Route path="/user/polls" component={MyPolls} />
              <Route path="/poll/:id" component={ViewPoll} />
            </Switch>
          </main>
        </div>
      </HashRouter>
    );
  }
}


export default App;
