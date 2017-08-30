import React from 'react';

class App extends React.Component {
  /**
   * Initiates the state.
   * Polls holds information about all the olls stored in the DB.
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
      <h1>This is SPARTA!</h1>
    );
  }
}


export default App;
