import React from 'react';
import PropTypes from 'prop-types';

class MyPolls extends React.Component {
  /**
   * @param {object} props
   * newPollName(string) holds a name for the new poll;
   * newPollOptions(Array of objects) holds options for the new poll;
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      newPollName: '',
      newPollOptions: [],
    };
  }

  /**
   * @returns {object} React element
   */
  render() {
    return (
      <div>
        You {this.props.userLoggedIn ? 'Are logged in' : 'Are not logged in'}
      </div>
    );
  }
}

MyPolls.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
};

export default MyPolls;
