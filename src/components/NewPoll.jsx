import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';


class NewPoll extends React.Component {
  /**
   * @param {object} props Contains user object;
   * newPollName(string) Name of your new poll;
   * newPollOptions(Array of objects) Holds poll's options;
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
   * saveToDB
   * saves the poll held in a state to the database;
   * @returns {Promise} Contains void;
   */
  saveToDB = () => {
    const data = {
      name: 'Kirk vs Piccard',
      owner: this.props.user.email,
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
    return (
      <h1>yoyoyoyo</h1>
    );
  }
}

NewPoll.propTypes = {
  user: PropTypes.shape({ email: PropTypes.string.isRequired }).isRequired,
};

export default NewPoll;
